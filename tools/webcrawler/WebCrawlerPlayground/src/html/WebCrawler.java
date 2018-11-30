package html;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Queue;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.jsoup.Jsoup;				// The JSOUP library is designed specifically for html parsing
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import image.ImageReceiver;

public class WebCrawler {
	private static Document htmlDocument;									// The document retrieved from the Web Archive to be parsed and saved
	private static HashSet<String> linksVisited = new HashSet<String>();	// A HashSet to keep track of visited links so they don't get visited again
	private static final String baseUrl = "https://web.archive.org/web/" + 	// The base url of Ethical Simulator in the Web Archive used for accessing...
			"http://seeri.etsu.edu:80/Ethics/EthicalSimulator/1024/";		// ...the different html pages found while crawling the website
	private static String link = "";										// Next html page to visit 
	private static Queue<String> linksToVisit = new LinkedList<String>();	// A Queue used for adding found html pages so that they can be visited later
	
	public static void main (String [] args) throws Exception {
		Elements scripts;
		Elements images;
		ImageReceiver saveImages = new ImageReceiver();
		Matcher windowLocationMatcher;
		Pattern windowLocationPattern; 
		
		linksToVisit.add("index.html");		// Add the base html page to the Queue so there is a starting point
		
		while (!linksToVisit.isEmpty()) {
			link = linksToVisit.remove();	// Remove the next html page to visit and store it
			
			System.out.println("Visiting Page: " + link);
			
			try {	
				htmlDocument = Jsoup.connect(baseUrl + link)	// Connect to the next page and save the html for parsing / saving
						.timeout(0).userAgent("Chrome").get();
				
				linksVisited.add(link);							// Since we have successfully retrieved the html of this page we won't need to visit it again
				
				htmlDocument.select("div#wm-ipp").remove();		// This div is on every page and contains code injected by the Web Archive so it can be removed
				
				if (!link.contains("reset.htm")) {				// The reset.htm page contained information, but nothing that the user could interact with so it can be skipped
					searchForHref("a");
					
					searchForHref("area");
					
					scripts = htmlDocument.select("script");	// Select all the <script> elements to be searched for window.locations which contain html pages
					
					for (Element script: scripts) {
						windowLocationPattern = Pattern.compile("(?is)window.location = \"(.+?)\"");	// This pattern along with a matcher finds any instances of window.location 
						windowLocationMatcher = windowLocationPattern.matcher(script.html());
						
						while (windowLocationMatcher.find()) {			// Go through every occurrence of window.location in the current <script> element
							addLink(windowLocationMatcher.group(1));	// .group(1) contains the html page that was going to be given to window.location
						}
					}
				}
				
				saveImages.setDocument(htmlDocument);	// Give the Image Receiver the current html document so that the images on it can be saved
				saveImages.run();
				
				images = htmlDocument.select("img");	// Select all the <img> elements in the html document
					
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
			
			Thread.sleep(45000);	// Without this delay the Web Archive would start to block connections made by this program
			
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
