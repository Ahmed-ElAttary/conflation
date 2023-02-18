const pool = require("./../modules/pgPool");

module.exports = async (req, res) => {
  const {
    sessionID,
    bufferValue,
    certainty,
    actualPercatange,
    bufferPercatange,
  } = req.body;

  pool.query(
    `
CREATE TABLE t${sessionID}buffer AS 
SELECT *,st_transform(st_buffer(st_transform(geom,3857),${bufferValue}),4326) AS geom_buffer FROM  t${sessionID};

CREATE TABLE t${sessionID}final AS 
SELECT m.geom as geom_msd,g.* FROM msd m, t${sessionID}buffer g WHERE
(st_intersects(m.geom,g.geom_buffer)) AND 
((st_area(st_intersection(m.geom,g.geom))*${actualPercatange}/st_area(m.geom))+(st_area(st_intersection(m.geom,g.geom_buffer))*${bufferPercatange}/st_area(m.geom))
>=${certainty});    

CREATE TABLE t${sessionID}linked AS 
SELECT * from t${sessionID} WHERE geom IN (SELECT geom FROM t${sessionID}final);

CREATE TABLE t${sessionID}unlinked AS  
SELECT * from t${sessionID} WHERE geom NOT IN (SELECT geom FROM t${sessionID}final);   
    `,
    (error, results) => {
      if (error) console.log(error);
      res.status(200).send({ message: "Conflation Completed Successfully" });
    }
  );
};
