package html;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Queue;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import image.ImageReceiver;

public class WebCrawler {
	private static Document htmlDocument;
	private static HashSet<String> linksVisited = new HashSet<String>();
	private static final String baseUrl = "https://web.archive.org/web/http://seeri.etsu.edu:80/Ethics/EthicalSimulator/1024/";
	private static String link = "";
	private static Queue<String> linksToVisit = new LinkedList<String>();
	
	public static void main (String [] args) throws Exception {
		Elements scripts;
		Elements images;
		ImageReceiver saveImages = new ImageReceiver();
		Matcher windowLocationMatcher;Pattern windowLocationPattern; 
		
		linksToVisit.add("index.html");
		
		while (!linksToVisit.isEmpty()) {
			link = linksToVisit.remove();
			
			System.out.println("Visiting Page: " + link);
			
			try {	
				htmlDocument = Jsoup.connect(baseUrl + link).timeout(0).userAgent("Chrome").get();
				
				linksVisited.add(link);
				
				htmlDocument.select("div#wm-ipp").remove();
				
				if (!link.contains("reset.htm")) {
					searchForHref("a");
					
					searchForHref("area");
					
					scripts = htmlDocument.select("script");
					
					for (Element script: scripts) {
						windowLocationPattern = Pattern.compile("(?is)window.location = \"(.+?)\"");
						windowLocationMatcher = windowLocationPattern.matcher(script.html());
						
						while (windowLocationMatcher.find()) {
							addLink(windowLocationMatcher.group(1));
						}
					}
				}
				
				saveImages.setDocument(htmlDocument);
				saveImages.run();
				
				images = htmlDocument.select("img");
					
				for (Element image : images) {
					String src = image.attr("src");
			        String fileName = saveImages.getFileName(src);
			           
			        if (link.contains("Files/") || link.contains("files/")) {
			        	
			        	if (link.contains("Angel/") || link.contains("Help/") || link.contains("Computer/")) {
			        		fileName = fileName.substring(fileName.indexOf("/") + 1, fileName.length());
			        		fileName = "../" + fileName;
			        	} else {
			        		fileName = fileName.substring(fileName.indexOf("/") + 1, fileName.length());
			        	}
			        } 
			        
			        image.attr("src", fileName);
			    }
				
				writeHtmlFile();
			}
			catch(Exception e)
			{
				System.out.println(e.getMessage());
			}
			
			Thread.sleep(45000);
			
			System.out.println("");
		}
	}
	
	private static void addLink(String passedLink)
	{
		String baseLink = "";
		String badText = "web.archive.org";
		String extraText = "/Ethics/EthicalSimulator/1024/";
		String linkToAdd = passedLink;
		
		if (link.contains("/")) {
			baseLink = link.substring(0, link.lastIndexOf('/') + 1);
		}
		
		if (!linkToAdd.contains("@") 
			&& !linkToAdd.equals("") 
			&& !linkToAdd.contains(badText))
		{
			if (linkToAdd.contains(extraText)) {
				linkToAdd = linkToAdd.substring(linkToAdd.indexOf(extraText) + extraText.length(), linkToAdd.length());
			} else if (linkToAdd.contains("../")) {
				linkToAdd = baseLink.substring(0, baseLink.indexOf("/")) + linkToAdd.substring(linkToAdd.indexOf("/"), linkToAdd.length());
			} else {
				linkToAdd = baseLink + linkToAdd;
			}	
			
			if (!linksVisited.contains(linkToAdd) 
				&& !linksToVisit.contains(linkToAdd)) {
				System.out.println(linkToAdd);
				linksToVisit.add(linkToAdd);
			}
		}
	}
	
	private static void writeHtmlFile()
	{	
		BufferedWriter writer;
		String filePath = "C:\\Users\\Ian\\Documents\\College Classes\\CS 497\\WebCrawlerPlayground\\EthicalSimulator\\";
		try {
			writer = new BufferedWriter(new FileWriter(filePath + link));
			writer.write(htmlDocument.outerHtml());
			writer.close();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}	
	}
	
	private static void searchForHref(String elementTag)
	{
		Elements elementsToSearch;
		String elementHref = null;
		String elementOnclick = null;
		
		elementsToSearch = htmlDocument.select(elementTag);
		
		for (Element element: elementsToSearch) {
			elementHref = element.attr("href");
			
			if (!element.attr("href").contains("#")) {
				addLink(elementHref);
			} else {
				elementOnclick = element.attr("onclick");
				
				if (elementOnclick.contains("'")) {
					elementOnclick = elementOnclick.substring(elementOnclick.indexOf("'") + 1, elementOnclick.indexOf("'", elementOnclick.indexOf("'") + 1));
					addLink(elementOnclick);
				}
			}
		}	
	}
}
