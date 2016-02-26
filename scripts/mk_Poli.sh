#!/bin/bash
# ========================================================================================================
# FILE: 
# 
# DESCRIPTION:
# Process: 	...
# 
# Notes:	...
# 
# Rev 1.1    Jan 2016  Fernando Fahl
# ==========================================================================================================


	export Layer_ID=(NUTS0 GLC2000 Corine06 Atlas2006 GlobCover MODIS10 CCI_ESA GLand30 CustomWMS)
    
	export Legend_ID=(GLC2000 Corine06 Atlas2006 GlobCover MODIS10 CCI_ESA GLand30 CustomWMS)
	
	export Table_ID=(GLC2000 Corine06 Atlas2006 GlobCover MODIS10 CCI_ESA GLand30 CustomWMS)

	export Layer_Name=('Country Boundaries' 'Global Land Cover (2000)' 'Corine (2006)' 'Urban Atlas (2006)' 'GlobCover (2009)' 'MODIS (2010)' 'Land Cover CCI (2010)' 'Global Land Cover 30m (2010)' 'Custom Layers'  )

	export Topics="ADM LULC Custom"
	
	export ADM_Layers="NUTS0"
	export ADM_Group="Administrative Layers"
	
	export LULC_Layers="GLC2000 Corine06 Atlas2006 GlobCover MODIS10 CCI_ESA GLand30"
	export LULC_Group="Land Use - Land Cover"
    
    export Custom_Layers="CustomWMS"
	export Custom_Group="Custom Layers"
	
	export out_File="../index_LULC.html"
	export out_Class="draggable"
	export out_Legend="leg"
	export out_Table="tbl"
	export out_Opacity="opy"
	export out_Head="01_Head.txt"
	export out_Header="02_Header.txt"
	export out_Menu="03_Navigation.txt"
	export out_END="05_END.txt"


function create_Layer_DIVs () {


	echo -e "\n\t\t\t<!--HOME-->" >> ${out_File}
	echo -e "\t\t\t<div class=\"sidebar-pane\" id=\"home\">" >> ${out_File}
	echo -e "\t\t\t\t<h1 class=\"sidebar-header\">Layers<div class=\"sidebar-close\"><i class=\"fa fa-caret-right\"></i></div></h1>" >> ${out_File}


	for list in ${Topics}
	do
	
		local topic_Layers="${list}_Layers"
		local topic_Group="${list}_Group"
		local topic_SubGroup="${list}_SubGroup"
		
		eval "layer_LIST=\$$topic_Layers"
		eval "group_NAME=\$$topic_Group"
		eval "subgroup_NAME=\$$topic_SubGroup"
        
        [ -z "${group_NAME}" ] || echo -e "\n\t\t\t\t<header><h2>${group_NAME}</h2></header>" >> ${out_File}
		echo -e "\n\t\t\t\t<div id=\"${list}\" class=\"tab_active\" >" >> ${out_File}
	
		[ -z "${subgroup_NAME}" ] || echo -e "\t\t\t\t\t<p>${subgroup_NAME}</p>" >> ${out_File}
		
		for index in ${!Layer_ID[@]}
		do 	
		
			local ID="${Layer_ID[index]}"
			local layers="${Layer_Name[index]}"
		
			for maps in ${layer_LIST}
			do 	
			
				if [ ${ID} == ${maps} ]; then
				
					local LEG="leg_${ID}"
					local TBL="tbl_${ID}"
			
					echo -e "\n\t\t\t\t\t<div class=\"${out_Class}\" id=\"${ID}\">" >> ${out_File}
					
					echo -e "\t\t\t\t\t\t<li><input type=\"checkbox\" value=\"${ID}\">" >> ${out_File}		
					echo -e "\t\t\t\t\t\t<label for=\"${ID}\">${layers}</label></li>" >> ${out_File}
					echo -e "\t\t\t\t\t</div>" >> ${out_File}
					
				fi
			
			done

		done	
		
		echo -e "\t\t\t\t</div>" >> ${out_File}
	done
	
	echo -e "\t\t\t</div>" >> ${out_File}
}

function create_Legend_DIVs () {

		local position=1
		
		echo -e "\n\t\t\t<!--Legend-->" >> ${out_File}
		echo -e "\t\t\t<div class=\"sidebar-pane\" id=\"legend\">" >> ${out_File}
		echo -e "\t\t\t\t<h1 class=\"sidebar-header\">Legend<div class=\"sidebar-close\"><i class=\"fa fa-caret-right\"></i></div></h1>" >> ${out_File}
        
		echo -e "\n\t\t\t\t<div id=\"legend\" class=\"tab\" style=\"overflow-y: none; height:1800px;\">" >> ${out_File}
		echo -e "\n\t\t\t\t\t<div class=\"unsorted\">" >> ${out_File}
		
		for index in ${!Layer_ID[@]}
		do 	
		
			local ID="${Layer_ID[index]}"
			local layers="${Layer_Name[index]}"
			local LEG="${out_Legend}_${ID}"
		
			for maps in ${Legend_ID[@]}
			do 	
			
				if [ ${ID} == ${maps} ]; then                    
			
					echo -e "\n\t\t\t\t\t\t<div class=\"${out_Legend}\" id=\"${LEG}\" rel=\"${position}\">" >> ${out_File}
					echo -e "\t\t\t\t\t\t\t<h6>${layers}</h6>" >> ${out_File}
					echo -e "\t\t\t\t\t\t\t<iframe src=\"./images/${ID}.svg\" width=\"420\" height=\"360\" style=\"border:none;\";></iframe>" >> ${out_File}
					echo -e "\t\t\t\t\t\t</div>" >> ${out_File}
					
					position=$(( $position + 1 ))	
					
				fi			
			done
		done

		echo -e "\t\t\t\t\t</div>" >> ${out_File}	
		echo -e "\t\t\t\t</div>" >> ${out_File}	
		echo -e "\t\t\t</div>" >> ${out_File}	
	
}

function create_Info_DIVs () {

		local position=1
		
		echo -e "\n\t\t\t<!--Information-->" >> ${out_File}
		echo -e "\t\t\t<div class=\"sidebar-pane\" id=\"information\">" >> ${out_File}
		echo -e "\t\t\t\t<h1 class=\"sidebar-header\">Information<div class=\"sidebar-close\"><i class=\"fa fa-caret-right\"></i></div></h1>" >> ${out_File}
        
        echo -e "\n\t\t\t\t<div class=\"order_Table\">" >> ${out_File}
        echo -e "\n\t\t\t\t<div id=\"slider_Bar\"><h5>Opacity:</h5></div>" >> ${out_File}
					
		
		for index in ${!Layer_ID[@]}
		do 	
		
			local ID="${Layer_ID[index]}"
			local layers="${Layer_Name[index]}"
			local TBL="${out_Table}_${ID}"	
			
			for maps in ${Table_ID[@]}
			do 	
			
				if [ ${ID} == ${maps} ]; then                    
			
					echo -e "\n\t\t\t\t\t<div class=\"${out_Table}\" id=\"${TBL}\" rel=\"${position}\">" >> ${out_File}
					echo -e "\t\t\t\t\t\t<h6>${layers}</h6>" >> ${out_File}
					echo -e "\t\t\t\t\t\t<iframe src=\"./html/${ID}.html\" width=\"420\" height=\"360\" style=\"border:none;\";></iframe>" >> ${out_File}
					echo -e "\t\t\t\t\t</div>" >> ${out_File}

					echo ${maps} $position		
					position=$(( $position + 1 ))						
					
				fi
			
			done

		done	
		
		echo -e "\t\t\t\t</div>" >> ${out_File}
		echo -e "\t\t\t</div>" >> ${out_File}
	
}

function create_Opacity_DIVs () {

		local position=1
		
		echo -e "\n\t\t\t<!--Settings-->" >> ${out_File}
		echo -e "\t\t\t<div class=\"sidebar-pane\" id=\"settings\">" >> ${out_File}
		echo -e "\t\t\t\t<h1 class=\"sidebar-header\">Settings<div class=\"sidebar-close\"><i class=\"fa fa-caret-right\"></i></div></h1>" >> ${out_File}
        
        echo -e "\n\t\t\t\t<div class=\"order_Slider\">" >> ${out_File}
		
		for index in ${!Layer_ID[@]}
		do 	
		
			local ID="${Layer_ID[index]}"
			local layers="${Layer_Name[index]}"
			local OPY="${out_Opacity}_${ID}"		
			
			                 
	
			echo -e "\n\t\t\t\t\t<div class=\"${out_Opacity}\" id=\"${OPY}\" rel=\"${position}\">" >> ${out_File}
			echo -e "\t\t\t\t\t\t<h6><p>${layers}</p></h6>" >> ${out_File}
			echo -e "\t\t\t\t\t\t<input id=\"${ID}\" class=\"slider\"  type=\"range\" min=\"0\" max=\"1\" step=\"0.1\" value=\"1\" autocomplete=\"off\" onchange=\"updateOpacity(this)\"><br>" >> ${out_File}
			echo -e "\t\t\t\t\t</div>" >> ${out_File}
	
			position=$(( $position + 1 ))
			
		done	
		
		echo -e "\t\t\t\t</div>" >> ${out_File}
		echo -e "\t\t\t</div>" >> ${out_File}
	
}

function MACRO_Structure () {	
	# HEAD
	cat "${out_Head}" > ${out_File}	
	
	# BODY
	echo -e "\n\n<body>" >> ${out_File}
	
		# HEADER
		cat "${out_Header}" >> ${out_File}
		
		# MENU
		echo -e "\t\n\n<!--Menu block-->" >> ${out_File}
		echo -e "\t<div id=\"sidebar\" class=\"sidebar collapsed\">\n" >> ${out_File}		
		cat "${out_Menu}" >> ${out_File}
	
		# TABS
		echo -e "\n\n\t\t<!--Tab panes-->" >> ${out_File}
		echo -e "\t\t<div class=\"sidebar-content\">" >> ${out_File}
		
			# HOME           
			create_Layer_DIVs	
			
			# LEGEND
			create_Legend_DIVs
			
			# INFO
			create_Info_DIVs
			
			# SETTINGS
			create_Opacity_DIVs
		
		# Close DIVs
		
		echo -e "\n\t\t</div>\n\t</div>\n" >> ${out_File}	
	
		cat "${out_END}" >> ${out_File}
		
	echo -e "\n\n</body>\n</html>" >> ${out_File}	

}


MACRO_Structure