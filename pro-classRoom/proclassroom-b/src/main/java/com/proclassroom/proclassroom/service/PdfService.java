package com.proclassroom.proclassroom.service;

import com.proclassroom.proclassroom.model.ComparisonResult;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.apache.commons.text.similarity.LevenshteinDistance;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PdfService {

    public List<ComparisonResult> comparePdfParagraphsFromFiles(List<File> files)
            throws IOException, TesseractException {

        Map<String, List<String>> fileParagraphs = new HashMap<>();

        for (File file : files) {
            String text = extractText(file);
            System.out.println("Text length for " + file.getName() + ": " + text.length());

            List<String> paragraphs = Arrays.stream(text.split("(?<=[.!?])\\s+"))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList());

            fileParagraphs.put(file.getName(), paragraphs);
            System.out.println("Extracted " + paragraphs.size() + " paragraphs from " + file.getName());
        }

        List<ComparisonResult> results = new ArrayList<>();
        List<String> fileNames = new ArrayList<>(fileParagraphs.keySet());

        for (int i = 0; i < fileNames.size(); i++) {
            for (int j = i + 1; j < fileNames.size(); j++) {
                String f1 = fileNames.get(i);
                String f2 = fileNames.get(j);

                List<String> paras1 = fileParagraphs.get(f1);
                List<String> paras2 = fileParagraphs.get(f2);

                int similarCount = countSimilarParagraphs(paras1, paras2);

                double similarityPercentPdf1 = paras1.isEmpty() ? 0 : ((double) similarCount / paras1.size()) * 100;
                double similarityPercentPdf2 = paras2.isEmpty() ? 0 : ((double) similarCount / paras2.size()) * 100;

                System.out.println("Compared " + f1 + " and " + f2 + " => Similar: " + similarCount);

                ComparisonResult result = new ComparisonResult(f1, f2, similarCount, similarityPercentPdf1,
                        similarityPercentPdf2);
                results.add(result);
            }
        }

        return results;
    }

    private String extractText(File file) throws IOException, TesseractException {
        PDDocument document = PDDocument.load(file);
        PDFTextStripper stripper = new PDFTextStripper();
        String extractedText = stripper.getText(document);

        if (extractedText.trim().length() > 100) {
            document.close();
            return extractedText;
        }

        
        PDFRenderer renderer = new PDFRenderer(document);
        Tesseract tesseract = new Tesseract();
        tesseract.setDatapath("C:\\Program Files\\Tesseract-OCR\\tessdata\\");
        tesseract.setLanguage("eng");

        StringBuilder ocrText = new StringBuilder();
        for (int i = 0; i < document.getNumberOfPages(); i++) {
            BufferedImage image = renderer.renderImageWithDPI(i, 300);
            String text = tesseract.doOCR(image);
            ocrText.append(text).append("\n\n");
        }

        document.close();
        return ocrText.toString();
    }

    private int countSimilarParagraphs(List<String> paras1, List<String> paras2) {
        int count = 0;
        for (String p1 : paras1) {
            for (String p2 : paras2) {
                if (getSimilarity(p1, p2) > 0.85) {
                    count++;
                    break;
                }
            }
        }
        return count;
    }

    private double getSimilarity(String s1, String s2) {
        LevenshteinDistance dist = new LevenshteinDistance();
        int max = Math.max(s1.length(), s2.length());
        if (max == 0)
            return 1.0;
        return 1.0 - (double) dist.apply(s1, s2) / max;
    }
}
