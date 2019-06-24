package com.tfg.cirsim.api.services.impl;

import java.io.FileOutputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg.cirsim.api.entities.Image;
import com.tfg.cirsim.api.repository.ImageRepository;
import com.tfg.cirsim.api.services.ImageService;

/**
 * 
 * @author francisco riedemann
 * @date 22/06/2019
 */
@Service
public class ImageServiceImpl implements ImageService {
	
	@Autowired
	ImageRepository imageRepository;

	@Override
	public Set<Image> getImage() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Image getImage(Long id) {
		/*byte[] fileContent = FileUtils.readFileToByteArray(new File(filePath));
		String encodedString = Base64.getEncoder().encodeToString(fileContent);*/
		return null;
	}

	@Override
	public Image updateImage(Long id, Image image) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Image deleteImage(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Image addImage(Image image) {
		String imageFormat = obtaingFormat(image.getImageb64());
		System.err.println(imageFormat);
		
		SimpleDateFormat sm = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
	    String strDate = sm.format(new Date());
		String imageName = strDate + "." + imageFormat;
		System.err.println(imageName);
		
		byte[] data = removeFormatParts(image, imageFormat);
		
		String path = "src/main/resources/images/" + imageName;
		
		try(OutputStream stream = new FileOutputStream(path)){
		   stream.write(data);
		   image.setImageb64(path);
		   return imageRepository.save(image);
		} catch (Exception e) {
		   System.err.println("Couldn't write to file...");
		   return null;
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

}
