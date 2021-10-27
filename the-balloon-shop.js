module.exports = (pool, validColors) => {
   
  // insert valid colors into the database here
  async function insertValidColor(color) {
    await pool.query('INSERT INTO valid_color(color_name) VALUES $1', [color]);
  }

  async function insertInvalidColor(color) {
    await pool.query('INSERT INTO invalid_color(color_name) VALUES $1', [color]);
  }

    async function getValidColors() {
         var valid = await pool.query("select * from valid_color");
         const validColors = valid.rowCount;
     
         return validColors;
     }

   async function requestColor (color) {
        if (color) {
          await pool.query(
            'UPDATE valid_color SET count = count+1 WHERE color_name = $1',
            [color],
          );
        } else {
          await pool.query(
            'INSERT INTO invalid_color(color_name, count) VALUES ($1, 0)',
            [color],
          );
          const count = await pool.query(
            'UPDATE invalid_color SET count = count+1 WHERE color_name = $1 RETURNING COUNT',
            [color],
          );
          if ((await colorCount(color)) >= 5) {
            await pool.query(
              'INSERT INTO valid_color(color_name, count) VALUES ($1, $2)',
              [color, colCount],
            );
    
            await pool.query('DELETE FROM invalid_color WHERE color_name = $1', [
              color,
            ]);
          }
        }
    }

   async function colorCount (color) {
        if (color) {
          const colCount = await pool.query(
            'SELECT count FROM valid_color WHERE color_name = $1',
            [color],
          );
          return colCount.rows[0].count;
        } else {
          const colCount = await pool.query(
            'SELECT count FROM invalid_color WHERE color_name = $1',
            [color],
          );
          return colCount.rows[0].count;
        }
    }

   async function getInvalidColors () {
        var invalid = await pool.query("select * from invalid_color");
        const invalidColors = invalid.rowCount;
        return invalidColors;
    }
     
    function allColors () {
        const validColors = await getValidColors();
        const invalidColors = await getInvalidColors();

        return invalidColors + validColors;
    }

    return {
        insertValidColor,
        insertInvalidColor,
        getValidColors,
        requestColor,
        colorCount,
        getInvalidColors,
        allColors
    }
}