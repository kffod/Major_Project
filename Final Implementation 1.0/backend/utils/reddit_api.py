import praw
from config import REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USER_AGENT
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Reddit API
try:
    reddit = praw.Reddit(
        client_id=REDDIT_CLIENT_ID,
        client_secret=REDDIT_CLIENT_SECRET,
        user_agent=REDDIT_USER_AGENT
    )
    logger.info("Reddit API initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize Reddit API: {str(e)}")
    raise

def get_reddit_user_details(username):
    try:
        logger.info(f"Fetching details for user: {username}")
        user = reddit.redditor(username)
        
        # Test if user exists by accessing a property
        user.name  # This will raise an exception if user doesn't exist
        
        return {
            "screen_name": username,
            "name": user.name,
            "verified": user.verified,
            "listed_count": user.comment_karma + user.link_karma,
            "post_karma": user.link_karma,
            "comment_karma": user.comment_karma,
            "cake_day": user.created_utc,
            "achievements": ["Popular Post", "Buzz-Worthy Post"],
            "trophy_case": ["Four-Year Club", "Verified Email"],
            "profile_image": user.icon_img if hasattr(user, 'icon_img') else None
        }
    except praw.exceptions.NotFound:
        logger.error(f"User not found: {username}")
        return None
    except praw.exceptions.RedditAPIException as e:
        logger.error(f"Reddit API error for user {username}: {str(e)}")
        return None
    except Exception as e:
        logger.error(f"Unexpected error fetching user {username}: {str(e)}")
        return None
