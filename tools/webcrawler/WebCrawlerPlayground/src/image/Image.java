package image;

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import java.net.URL;

/**
 * @Author Rawaz Rahim and Ian Kenten
 * @Date Sep/10/18
 *
 * This class is saving image from the url link that is passed in.
 * ***************************************************************
 * When you pass in the path for the acm ethic make sure you put
 *  "https://web.archive.org" before the path. Because way back machine doesn't give you the full link.
 *
 * *************************************************************
 */
public class Image {

    private String src;
    private String fileName;

    Image(String src, String fileName) {
        this.src = src;
        this.fileName = fileName;
    }

    /**
     * Getter method to get the full link
     * @return string which the path of the image.
     */
    public String get_src() {
        return this.src;
    }

    /**
     * This is method is using substring to get name of the file.
     * @return string which is the name of the file.
     */
    public String get_name() {
        return this.fileName;
    }

    /**
     * This method is writing the file from the internet to local.
     * @throws IOException
     */
    public void save_image() throws IOException{
        URL url = new URL(get_src());

        System.out.println("Retrieving Image: " + src);
        
        InputStream in = url.openStream();

        OutputStream out = new BufferedOutputStream(new FileOutputStream("C:\\Users\\Ian\\Documents\\College Classes\\CS 497\\WebCrawlerPlayground\\EthicalSimulator\\" + get_name()));

        while(true) {
            int read = in.read();

            if(read == -1) {
                break;
            }

            out.write(read);
        }

        in.close();
        out.close();
    }
}
