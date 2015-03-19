

						var itemsPerPage = 10;
						var currPage = 1
						var count;
						var set1 = false;
						var set2 = false;
						function showData(str,currIndex,requestSet){
									if ( currIndex < 1 ){
											alert("You are on the first page click next to move forward");
									}
									if ( requestSet == "setTwo"){
												set2 = true;
									} else if ( requestSet == "setOne"){
												set1 = true;
									}
									var node = document.getElementById("myFukcingBody").innerHTML= '';
							
									document.getElementById("data").innerHTML="";
									console.log(str);
									$.ajax( {
											type : 'post',
											url : 'get_data.php',
											data : { 'input' : str, "currIndex" : currIndex ,"numItemsPerPage" : itemsPerPage , "set1" : set1 , "set2" : set2 },
											dataType : 'json',
											success : function(data) {
													
													
													var count = Object.keys(data)[Object.keys(data).length-1];

													console.log(count,str);
													prepDisplayDiv(count,str);
													createPaginationHTML(str,currIndex);
													createDiv(data);
												}
									});
						}
						function createTables(){
									var displayTable = document.createElement("table");
									var body = document.getElementById("myFukcingBody");
									body.appendChild(displayTable);
									var tableHeadings =document.createElement("th");
									var ImageHeader = document.createElement("td").innerHTML ="Images";
									tableHeadings.appendChild(ImageHeader);
									var textHeader = document.createElement("td").innerHTML = "Text";
									tableHeadings.appendChild(textHeader);
									var addDeleteHeader = document.createElement("td").innerHTML = "add/delete";
									tableHeadings.appendChild(addDeleteHeader);
									displayTable.appendChild(tableHeadings);
									
						}

						function prepDisplayDiv(count,keyword){
									

										var container = document.getElementById('datainfo');
										var displayinfo = document.createElement("div");
										displayinfo.id="displayinfo";
										displayinfo.innerHTML = "Showing " + itemsPerPage+ "items out of  "+count;
										displayinfo.style.backgroundColor ="lightblue";
										container.appendChild(displayinfo);

										
										container.innerHTML ="Number of Objects to be  displyed : "+Math.min(count,itemsPerPage);
										var stats = document.createElement("div");
										stats.id = "contentinfo";
										stats.innerHTML = "Found " +count+" exmaples for the keyword "+keyword+".";
										stats.style.backgroundColor = "green";
										container.appendChild(stats);


						}
					
							//navigation tools for pagination of data
						function createPaginationHTML(keyword,currIndex){
										var container = document.getElementById("datainfo");
                                        var btn1 =  document.createElement("a");
                                        btn1.innerHTML = "Next";
										btn1.onclick = function() { 

													showData(keyword,currIndex+1);													
											};
										btn1.id = "next";
										container.appendChild(btn1);

										//next button
										var btn1 =  document.createElement("a");
                                        btn1.innerHTML = "Prev";
										btn1.onclick = function() { 

													showData(keyword,currIndex-1);													
											};
										btn1.id = "prev";
										container.appendChild(btn1);

						}
							
					    function  createDiv(data) {
									for ( var i =0 ; i < data.length;i++ ){	
											var div = document.createElement("div");
											div.id = data[i].id;
											var p = document.createElement("p");
											var text = "<strong>"+data[i].text+"</strong>";
											p.innerHTML = text;
											div.appendChild(p);
											div.className="twitterDiv";
											div.style.background = "white";
											div.style.color = "black";
											document.getElementById("data").appendChild(div);
											var img = document.createElement("img");
											img.src = data[i].imgUrl;
											img.className ="img-thumbnail";
											var height = img.clientHeight;
											div.style.heigh = height;
											var id = data[i].id;
											document.getElementById(id).appendChild(img);

									}	
						}		
							
	  

