#! /bin/sh
sqlite3 var/data/flightdata.db < scripts/build-flightdata-db.sql
