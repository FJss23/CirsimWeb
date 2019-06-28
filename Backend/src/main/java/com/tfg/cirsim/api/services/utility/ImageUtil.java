package com.tfg.cirsim.api.services.utility;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;

import com.tfg.cirsim.api.entities.Exercise;
import com.tfg.cirsim.api.entities.Image;

public class ImageUtil {
	
	private static ImageUtil instance = new ImageUtil();
	 
	private ImageUtil() { }
	 
	public static ImageUtil getInstance( ) {
		if (instance == null) {
	        instance = new ImageUtil();
	    }
	    return instance;
    }

	public void addImage(Image image, Exercise exercise) {
		image.setExercise(exercise);
		
		if(image.getImageb64() != null) {
			String imageFormat = obtaingFormat(image.getImageb64());
			
			SimpleDateFormat sm = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
		    String strDate = sm.format(new Date());
			String imageName = strDate + "." + imageFormat;
			
			byte[] data = removeFormatParts(image, imageFormat);
			
			String path = "src/main/resources/images/" + imageName;
			
			try(OutputStream stream = new FileOutputStream(path)){
			   stream.write(data);
			   image.setImageb64(path);
			} catch (Exception e) {
			   System.err.println("Couldn't write to file...");
			}
		}
	}

	private byte[] removeFormatParts(Image image, String format) {
		String partToDelete = "data:image/" + format + ";base64,";
		String correctB64 = image.getImageb64().replace(partToDelete, "");
		byte[] data = Base64.getDecoder().decode(correctB64);
		return data;
	}

	private String obtaingFormat(String almostB64) {
		int startIndex = almostB64.indexOf("data:image/") + 10;
	    int endIndex = almostB64.indexOf(";base64,");
	    return almostB64.substring(startIndex + 1, endIndex);
	}

	public void deleteImage(Image image) {
		File file = new File(image.getImageb64());
		file.delete();
	}
}
