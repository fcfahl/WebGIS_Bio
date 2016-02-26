	 drop table "urban_atlas_2006_diss";
	 create table "urban_atlas_2006_diss" AS
	 SELECT cities,item,code,ST_Union(ST_MakeValid(ST_SnapToGrid(wkb_geometry,0.0001)))
	 FROM urban_atlas_2006
	 GROUP BY code,cities,item;
