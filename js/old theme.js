/*
function google_search_api($search,$searchType,$count) {

$url = 'http://ajax.googleapis.com/ajax/services/search/'.$searchType.'?v=1.0&q='.urlencode($search).'&filter=1';
if($searchType == "images"){
    //&rsz=large
    $url .="&safe=moderate";
}
$ip=$_SERVER['REMOTE_ADDR'];
$url .="&userip=$ip&rsz=$count&key=".GOOGLE_API;
#echo $url;
$obj = json_decode( file_get_contents($url) );
foreach($obj->responseData->results as $i)
{
    // for images
    if($searchType == "images")
    {
        $source = "/timthumb.php?src=".$i->unescapedUrl."&a=t&h=75&w=75";
        //$source = $i->unescapedUrl;
        if (fopen($i->unescapedUrl, "r")) {
            echo "<li><img src=\"".$source."\" alt=\"".$search."\" width=\"75\" height=\"75\" /></li>";
        }
    }
    // for blogs
    else
    {
        //$title = mb_convert_encoding($i->titleNoFormatting, 'iso-8859-1');
        $title = mb_convert_encoding($i->titleNoFormatting, "ISO-8859-1", "UTF-8");
        echo "<li><a href=\"".$i->postUrl."\" rel=\"external\"/>".$title."</a></li>";
    }
}*/