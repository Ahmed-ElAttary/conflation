const pool = require("../modules/pgPool");

module.exports = async (req, res) => {
  const { sessionID } = req.body;
  pool.query(
    `select (select count(*) from  t${sessionID}) as total ,(select count(*) from  t${sessionID}linked) as linked,(select count(*) from  t${sessionID}unlinked) as unlinked`,
    (error, results) => {
      if (error) console.log(error);
      res.status(200).json(results.rows);
    }
  );
};
