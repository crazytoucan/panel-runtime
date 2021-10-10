DROP TABLE IF EXISTS test;
CREATE TABLE test (
  time INTEGER,
  icao24 NCHAR(6),
  lat REAL,
  lon REAL,
  velocity FLOAT,
  heading FLOAT,
  vertrate FLOAT,
  callsign NCHAR(9),
  onground BOOLEAN,
  alert BOOLEAN,
  spi BOOLEAN,
  squawk INTEGER,
  baroaltitude FLOAT,
  geoaltitude FLOAT,
  lastposupdate REAL,
  lastcontact REAL
);

.separator ','
.import --csv --skip 1 'data/states_2021-08-02-01.csv' test
