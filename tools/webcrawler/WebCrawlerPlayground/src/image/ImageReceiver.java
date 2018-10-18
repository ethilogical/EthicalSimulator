package image;

import java.util.HashSet;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class ImageReceiver {

	private Document htmlDocument;
	private HashSet<String> imageSet;
	
	public ImageReceiver ()
	{
		imageSet = new HashSet<String>();
	}
	
	public void setDocument (Document htmlDocument)
	{
		this.htmlDocument = htmlDocument;
	}
	
	public void run() {
		Elements images = htmlDocument.select("img");

        try {
	        for (Element image : images) {
	        	String src = "https://web.archive.org" + image.attr("src");
	        	String fileName = getFileName(src);
	            
	            if (!imageSet.contains(fileName)) {
	            	imageSet.add(fileName);
	            	Image img = new Image(src, fileName);
	            	img.save_image();
	            }
	        }
        } catch (Exception e) {
        	System.out.println(e.getMessage());
        }
	}
	
	public String getFileName(String src) {
        int index = src.indexOf("1024/") + "1024/".length();
        String name = src.substring(index, src.length());
        return name;
    }
}
