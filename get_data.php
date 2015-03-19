<?php
		

		error_reporting(-1);
		ini_set('display_errors','On');
		set_time_limit(0); 
		$n =  new MongoClient(); 	
		$dbname = "wsd"; 	
		//handle to mongo db
		$db = $n->$dbname; 
		$list = $db->listCollections();
		//json string holding the ajax response.
		$jsonString = array();
		$lookUpCollections = array();
		//get the number of objects returned by the query to set up pagination.
		$count =0; 		$index = 0;
		$get_old_set=false;

		$oldIndex =0;
		if( $_POST['currIndex'] == 1) $oldIndex = 0;
		else if ($_POST['currIndex'] > 1 ){
				$oldIndex = ($currIndex-1)*10;
		}
		if ( isset($_POST['input'])) {
				$keyword = $_POST['input'];
		}
		if ( isset($_POST['currIndex']) ) {
				$currIndex = $_POST['currIndex']*10;

		}
		if ( isset($_POST['numItemsPerPage']) ) {
				$numItemsPerPage = $_POST['numItemsPerPage'];

		}

		if ( isset($_POST["set2"])) {
				$get_old_set =true;
		}

		if ( isset($get_old_set)){
				$lookUpCollections = array('wsd.new_data');
		}else{
				$lookUpCollections = array('wsd.raretweets','wsd.tweets');
		}	
		//preparing the query w.r.t keyword choosen
		$regex = "/".$keyword."/i";
		$regexObj = new MongoRegex($regex);
		$where = array("text" => $regexObj); 
		
		foreach ($list as $collection) {
				if (in_array($collection, $lookUpCollections)){
					$cursor =$collection->find($where);
					while ( $cursor->hasNext() ) {
							$index = $index +1;
							$document = $cursor->getNext();
			                $id = $document['id'];
							$text = $document['text'];
							$entities = $document['entities'];
							
							if (isset($entities['media'])) {
									if ( $index >= $oldIndex && $index <=$currIndex){
													$media  = $entities['media'];
													$img = $media[0]["media_url"];
													$jsonString[] = array("id"=>$id,"text"=>$text,"imgUrl"=>$img);
													$count = $count + 1;
	 								}
										
							}
					}
				}
		}
	

		$jsonString[] = array("numItems"=>$count);
		echo json_encode($jsonString);
	
?>

