import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini with basic model
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

def generate_report(user_data):
    """
    Generate a detailed report about a Reddit user using Gemini basic model
    """
    try:
        model = genai.GenerativeModel('gemini-pro')
        
        # Enhanced prompt with accuracy factors
        prompt = f"""
        Generate a detailed analysis report for Reddit user with the following metrics:

        User Profile:
        - Username: {user_data.get('screen_name')}
        - Account Status: {'Verified' if user_data.get('verified') else 'Not Verified'}
        
        Activity Metrics:
        - Post Karma: {user_data.get('post_karma', 0)}
        - Comment Karma: {user_data.get('comment_karma', 0)}
        - Total Activity: {user_data.get('listed_count', 0)}
        - Account Age: {user_data.get('cake_day')}
        
        Achievements & Recognition:
        - Achievements: {', '.join(user_data.get('achievements', []))}
        - Trophy Case: {', '.join(user_data.get('trophy_case', []))}
        
        Bot Detection:
        - Classification: {'Likely Bot' if user_data.get('is_bot') else 'Likely Human'}
        
        Please provide a comprehensive analysis including:
        1. Account Activity Analysis
           - Karma distribution (post vs comment ratio)
           - Activity level assessment
           - Engagement patterns
        
        2. Account Credibility Factors
           - Account age consideration
           - Verification status impact
           - Achievement significance
        
        3. Bot Detection Analysis
           - Key indicators supporting the classification
           - Confidence factors
           - Potential false positive/negative considerations
        
        4. Recommendations
           - Suggested actions based on findings
           - Risk assessment if applicable
        """
        
        response = model.generate_content(
            prompt,
            generation_config={
                'temperature': 0.7,
                'top_p': 0.8,
                'top_k': 40,
                'max_output_tokens': 1024,
            },
            safety_settings=[
                {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            ]
        )
        
        return response.text
        
    except Exception as e:
        print(f"Error generating report: {str(e)}")
        # Enhanced fallback report with accuracy factors
        karma_ratio = user_data.get('post_karma', 0) / max(user_data.get('comment_karma', 1), 1)
        activity_level = "High" if user_data.get('listed_count', 0) > 1000 else "Medium" if user_data.get('listed_count', 0) > 100 else "Low"
        
        return f"""
        Detailed Analysis Report for u/{user_data.get('screen_name')}:
        
        1. Account Activity Analysis:
        - Post Karma: {user_data.get('post_karma', 0)}
        - Comment Karma: {user_data.get('comment_karma', 0)}
        - Post/Comment Ratio: {karma_ratio:.2f}
        - Activity Level: {activity_level}
        
        2. Account Credibility Assessment:
        - Account Age: {user_data.get('cake_day')}
        - Verification Status: {'Verified' if user_data.get('verified') else 'Not Verified'}
        - Achievements: {', '.join(user_data.get('achievements', ['None']))}
        - Trophies: {', '.join(user_data.get('trophy_case', ['None']))}
        
        3. Bot Detection Analysis:
        - Classification: {'Likely Bot' if user_data.get('is_bot') else 'Likely Human'}
        - Key Indicators:
          * Karma Distribution Pattern
          * Account Age Consideration
          * Achievement Verification
        
        4. Recommendations:
        - {'Monitor account for unusual activity patterns' if user_data.get('is_bot') else 'Account appears to show normal human behavior'}
        - {'Consider additional verification steps' if user_data.get('is_bot') else 'Continue regular engagement monitoring'}
        
        Note: This analysis is based on available metrics and may require human verification.
        """ 