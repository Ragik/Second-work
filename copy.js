const readline = require('readline');//4 reading line
const fs = require('fs');
//for reading our csv file we need an interface
const rl = readline.createInterface({
input: fs.createReadStream('csvfile.csv')
  });

var writestream = fs.createWriteStream('fst.json');//4 wrtng into d json file
var writestream1 = fs.createWriteStream('snd.json');//4 wrtng into d json file
var writestream2 = fs.createWriteStream('thi.json');//4 wrtng into d json file

function Firstbar(population, countryName)
{
this.population =population;
this.countryName =countryName;
};
//taking values needed 4 snd graph
function Secondbar(gd, countryName)
{
  this.gd =gd;
  this.countryName =countryName;
};
function Thibar(pp, countryName)
{
  this.pp =pp;
  this.countryName=countryName;
};
var finalArray=[];//creating array 4 storing final result
var finalArray1=[];//2nd array
var finalArray2=[];//3rd array

var count=0;
var count1=0;
var count2=0;
var populationIndex,countryIndex,gd,pp;
 //to know what to do in a specific line
        rl.on('line', function (line)
         {
        if(count==0)
        {
        var headers=line.split(",");//splitting lines
        populationIndex = headers.indexOf("Population (Millions) - 2013");
        countryIndex = headers.indexOf("Country Name");
        count=1;
        }   //if end
       else//if count got incremented if the record is not dat specified one dn paking d values nd pushing it into d araay
       {
        var hi='';
        var lineInfo=line.split(",");
        if(lineInfo[countryIndex]!='European Union' && lineInfo[countryIndex]!='World')
        {
            hi = new Firstbar(lineInfo[populationIndex],lineInfo[countryIndex]);
            console.log(hi);
         } //END OF IF
          finalArray.push(hi);//pusing into d array
         }//else end
      }); //END OF LINE()
      //  //closing..every on must need a close
      rl.on('close', function() {
        for(var i=0;i<finalArray.length;i++){
              for(var j=i+1;j<finalArray.length;j++)
              {
                     if((parseFloat(finalArray[i].population,10))>(parseFloat(finalArray[j].population,10)))
                     {
                          var temp=finalArray[i];
                          finalArray[i]=finalArray[j];
                          finalArray[j]=temp;
                      }
                  }
              }
              //console.log(a);
         writestream.write(JSON.stringify(finalArray.reverse()));
      }); //END OF CLOSE

      //to know what to do in a specific line
             rl.on('line', function (line)
              {
             if(count1==0)
             {
             var headers=line.split(",");//splitting lines
             gd = headers.indexOf("GDP Billions (US$) - 2013");
             countryIndex = headers.indexOf("Country Name");
             count1=1;
             }   //if end
           else//if count got incremented if the record is not dat specified one dn paking d values nd pushing it into d araay
           {
             var hi1='';
             var lineInfo=line.split(",");
             if(lineInfo[countryIndex]!='European Union' && lineInfo[countryIndex]!='World')
             {
                 hi1 = new Secondbar(lineInfo[gd],lineInfo[countryIndex]);
                 console.log(hi1);
             } //END OF IF
               finalArray1.push(hi1);//pusing into d array
             }//else end
           }); //END OF LINE()
//2nd CLOSE
rl.on('close', function() {
  for(var i=0;i<finalArray1.length;i++){
        for(var j=i+1;j<finalArray1.length;j++)
        {
               if((parseFloat(finalArray1[i].gd,10))>(parseFloat(finalArray1[j].gd,10)))
               {
                    var temp=finalArray1[i];
                    finalArray1[i]=finalArray1[j];
                    finalArray1[j]=temp;
                }//end if
            }//end for
        }//end for
   writestream1.write(JSON.stringify(finalArray1.reverse()));
}); //END OF CLOSE
 //to know what to do in a specific line
                  rl.on('line', function (line)
                   {
                  if(count2==0)
                  {
                  var headers=line.split(",");//splitting lines
                  pp = headers.indexOf("Purchasing Power in Billions ( Current International Dollar) - 2013");
                  countryIndex = headers.indexOf("Country Name");
                  count2=1;
                  }   //if end
                else//if count got incremented if the record is not dat specified one dn paking d values nd pushing it into d araay
                {
                  var hi2='';
                  var lineInfo=line.split(",");
                  if(lineInfo[countryIndex]!='European Union' && lineInfo[countryIndex]!='World')
                  {
                      hi2 = new Thibar(lineInfo[pp],lineInfo[countryIndex]);
                      console.log(hi2);
                  } //END OF IF
                    finalArray2.push(hi2);//pusing into d array
                  }//else end
                }); //END OF LINE()
//3rd close
                rl.on('close', function()
                {
                  for(var i=0;i<finalArray2.length;i++)
                  {
                        for(var j=i+1;j<finalArray2.length;j++)
                        {
                               if((parseFloat(finalArray2[i].pp,10))>(parseFloat(finalArray2[j].pp,10)))
                               {
                                    var temp=finalArray2[i];
                                    finalArray2[i]=finalArray2[j];
                                    finalArray2[j]=temp;
                                }//end if
                            }//end for
                        }//for

                   writestream2.write(JSON.stringify(finalArray2.reverse()));
                }); //END OF CLOSE
