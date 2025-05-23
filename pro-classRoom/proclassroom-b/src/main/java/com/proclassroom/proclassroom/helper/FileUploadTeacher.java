// package com.proclassroom.proclassroom.helper;

// import java.io.File;
// import java.nio.file.Files;
// import java.nio.file.Paths;
// import java.nio.file.StandardCopyOption;

// import org.springframework.stereotype.Component;
// import org.springframework.web.multipart.MultipartFile;

// @Component
// public class FileUploadTeacher {

// // this is the path of file thos you want to upload
// public final String UPLOAD_DIR = "C:\\Users\\HARSHO MOHIT\\Desktop\\final2\\"
// + //
// "proclassroom\\src\\main\\resources\\static\\assignment";

// // method the upload the file
// public boolean uploadFile(MultipartFile multipartFile) {
// boolean f = false;

// try {

// Files.copy(multipartFile.getInputStream(),
// Paths.get(UPLOAD_DIR + File.separator + multipartFile.getOriginalFilename()),
// StandardCopyOption.REPLACE_EXISTING);

// f = true;

// } catch (Exception e) {
// e.printStackTrace();
// }

// return f;
// }

// }
