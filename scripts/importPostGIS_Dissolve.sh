#!/bin/bash
# ========================================================================================================
# FILE: 
# 
# DESCRIPTION:
# Process: 	...
# 
# Notes:	....
# 
# Rev 1.1    Mar 2015  Fernando Fahl
# ==========================================================================================================

function export_Parameters {

	export script_PATH=''
	export PG_PATH='/usr/bin/'

	
	export IFS=" "
	export delimiter=";"

	export DB_Driver="pg"
	export DB_Host="localhost"
	export DB_Name="lulc"
	export DB_Format="PostgreSQL"
	export DB_User="postgres"
	export DB_PWD="postgres"
	export DB_Port="5432"
	export DB_Schema="public"
	
	export PGHOST=localhost
	
	export DSN="${DB_Driver}:host=${DB_Host} dbname=${DB_Name} user=${DB_User} password=${DB_PWD}"
	

}

function exe_PSQL {

	echo -e "\nexe_PSQL -> psql -h ${DB_Host} -U ${DB_User} -d ${DB_Name} -c ${1} \n "
	
	if [ -z "${1}" ]; then	
		"${PG_PATH}"psql -h ${DB_Host} -U ${DB_User} -d ${DB_Name} 
	else	
		"${PG_PATH}"psql -h ${DB_Host} -U ${DB_User} -d ${DB_Name} -c "${1} ;"
	fi
	
	
}

function drop_PostGIS_Table {
	exe_PSQL "DROP TABLE IF EXISTS \"${1}\""
}

function vacuum_PostGIS {
	"${PG_PATH}"vacuumdb -a
}

function create_User {
	"${PG_PATH}"exe_PSQL  "CREATE USER ${DB_User} WITH PASSWORD ${DB_PWD};"
}

function create_Database {	
	"${PG_PATH}"createdb -U ${DB_User} ${DB_Name} 		
	exe_PSQL "CREATE ROLE ${DB_Role} LOGIN"		
	exe_PSQL "CREATE EXTENSION postgis"		
	exe_PSQL "CREATE EXTENSION postgis_topology"	
}

function create_Scheme {	
	exe_PSQL "CREATE SCHEMA yourschema"
}

function dissolve_PostGIS {	

	local in_File=${1}
	local out_File="${1}_diss"

	now=$(date +"%T")
	echo -e "\n_______________Starting time : $now"
	
	SQL_Query=" DROP TABLE IF EXISTS ${out_File};
	 create table ${out_File} AS
	 SELECT cities,item,code,ST_Union(ST_MakeValid(ST_SnapToGrid(wkb_geometry,0.0001)))
	 FROM ${in_File}
	 GROUP BY code,cities,item;
	 "
	 
	 # DROP TABLE IF EXISTS ${in_File};
	 
	 # Execute Query	
		exe_PSQL "${SQL_Query}"
		
	now=$(date +"%T")
	echo -e "\n_______________Ending time : $now\n\n\n"
	
}


function import_UrbanAtlas_2006 {

	display_MESSAGE "${FUNCNAME[ 0 ]}"	
	
	# Get parameters
	
		cd ./2006
		
		# for files in ${zip_Files}
		for files in at001l_wien.zip
		do						
				file_Name=`echo ${files} | cut -d'.' -f1`
		
				# Decompress 
					echo -e "\nunziping ..... ${files}"						
					unzip -j -o "${in_Folder}${files}" 
					
				# Import to PostGIS
					echo -e "\nimporting ..... ${file_Name}.shp"
					ogr2ogr -f PostgreSQL "PG:host=${DB_Host} user=${DB_User} dbname=${DB_Name} password=${DB_PWD}" ${file_Name}.shp -lco LAUNDER="YES"  -skipfailures	
					
				# Dissolve Polygons
					dissolve_PostGIS ${file_Name}
					
				# Remove temp files (leave only zip files)
					rm -f *.shp *.shx *.dbf *.prj *.pdf *.doc *.xml
					
				
		done	
	
		
}



export_Parameters
#~ create_User
create_Database
# import_UrbanAtlas_2006