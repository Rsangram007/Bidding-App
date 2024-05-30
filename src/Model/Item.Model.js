const pool = require("../utils/Database");
module.exports ={
createItem : async (
  name,
  description,
  startingPrice,
  imageUrl,
  endTime
) => {
  const result = await pool.query(
    "INSERT INTO items (name, description, starting_price, image_url, end_time) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, description, startingPrice, imageUrl, endTime]
  );
  return result.rows[0];
},

 getItemById : async (id) => {
  const result = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
  return result.rows[0];
},

getAllItems : async (limit, offset) => {
  const result = await pool.query("SELECT * FROM items LIMIT $1 OFFSET $2", [
    limit,
    offset,
  ]);
  return result.rows;
},

updateItem : async (
  id,
  name,
  description,
  startingPrice,
  imageUrl,
  endTime
) => {
  const result = await pool.query(
    "UPDATE items SET name = $1, description = $2, starting_price = $3, image_url = $4, end_time = $5 WHERE id = $6 RETURNING *",
    [name, description, startingPrice, imageUrl, endTime, id]
  );
  return result.rows[0];
}, 

 updateItemforbid:async (itemId, updateData) => {
  // Ensure non-null description if description is being updated
  if ('description' in updateData && (updateData.description === null || updateData.description === undefined)) {
      updateData.description = 'No description provided';
  }

  // Construct the dynamic SQL update query
  const setClause = Object.keys(updateData).map((key, index) => `"${key}" = $${index + 2}`).join(', ');
  const values = [itemId, ...Object.values(updateData)];

  const query = `UPDATE items SET ${setClause} WHERE id = $1 RETURNING *`;

  const result = await pool.query(query, values);
  return result.rows[0];
},

 deleteItem :async (id) => {
  await pool.query("DELETE FROM items WHERE id = $1", [id]);
}  


  
};
