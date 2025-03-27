import { jsPDF } from 'jspdf';

export const generatePDFReport = (userData) => {
    const doc = new jsPDF();
    
    // Set background gradient
    doc.setFillColor(147, 51, 234); // Purple
    doc.rect(0, 0, 210, 297, 'F');
    
    // Add header
    doc.setFontSize(24);
    doc.setTextColor(168, 85, 247); // Purple-400
    doc.text('Reddit Bot Detection Report', 105, 20, { align: 'center' });
    
    // Add user info
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text(`Analysis for u/${userData.screen_name}`, 105, 30, { align: 'center' });
    
    // Add timestamp
    doc.setFontSize(10);
    doc.setTextColor(156, 163, 175); // Gray-400
    doc.text(`Generated on ${new Date().toLocaleString()}`, 105, 35, { align: 'center' });
    
    // Account Activity Analysis
    doc.setFontSize(14);
    doc.setTextColor(168, 85, 247);
    doc.text('1. Account Activity Analysis', 20, 50);
    
    // Activity Data
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    let yPos = 60;
    doc.text(`Post Karma: ${userData.post_karma}`, 30, yPos);
    yPos += 10;
    doc.text(`Comment Karma: ${userData.comment_karma}`, 30, yPos);
    yPos += 10;
    doc.text(`Post/Comment Ratio: ${(userData.post_karma / (userData.comment_karma || 1)).toFixed(2)}`, 30, yPos);
    yPos += 10;
    doc.text(`Activity Level: ${userData.post_karma + userData.comment_karma > 1000 ? 'High' : 'Low'}`, 30, yPos);
    yPos += 20;
    
    // Account Credibility Assessment
    doc.setFontSize(14);
    doc.setTextColor(168, 85, 247);
    doc.text('2. Account Credibility Assessment', 20, yPos);
    
    // Credibility Data
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    yPos += 15;
    doc.text(`Account Age: ${Math.floor((Date.now()/1000 - userData.cake_day) / (24 * 60 * 60))} days`, 30, yPos);
    yPos += 10;
    doc.text(`Verification Status: ${userData.verified ? '✓ Verified' : 'Not Verified'}`, 30, yPos);
    yPos += 10;
    doc.text(`Achievements: ${userData.achievements.join(', ')}`, 30, yPos);
    yPos += 10;
    doc.text(`Trophies: ${userData.trophy_case.join(', ')}`, 30, yPos);
    yPos += 20;
    
    // Bot Detection Analysis
    doc.setFontSize(14);
    doc.setTextColor(168, 85, 247);
    doc.text('3. Bot Detection Analysis', 20, yPos);
    
    // Analysis Data
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    yPos += 15;
    doc.text(`Classification: ${userData.is_bot ? 'Likely Bot' : 'Likely Human'}`, 30, yPos);
    yPos += 10;
    doc.text('Key Indicators:', 30, yPos);
    yPos += 10;
    doc.text('• Karma Distribution Pattern', 40, yPos);
    yPos += 10;
    doc.text('• Account Age Consideration', 40, yPos);
    yPos += 10;
    doc.text('• Achievement Verification', 40, yPos);
    yPos += 10;
    doc.text(`Confidence Level: ${userData.is_bot ? 'High' : 'Medium'}`, 30, yPos);
    yPos += 20;
    
    // Recommendations
    doc.setFontSize(14);
    doc.setTextColor(168, 85, 247);
    doc.text('4. Recommendations', 20, yPos);
    
    // Recommendations List
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    yPos += 15;
    const recommendations = [
        '• Monitor account for unusual activity patterns',
        '• Consider additional verification steps',
        '• Review recent post and comment history',
        '• Check for automated behavior patterns'
    ];
    
    recommendations.forEach(rec => {
        doc.text(rec, 30, yPos);
        yPos += 10;
    });
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text('Note: This analysis is based on available metrics and may require human verification.', 
        105, yPos + 10, { align: 'center' });
    
    // Save the PDF
    doc.save(`bot-report-${userData.screen_name}.pdf`);
}; 