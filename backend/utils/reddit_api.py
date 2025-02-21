import praw
from config import REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USER_AGENT

# Initialize Reddit API
reddit = praw.Reddit(
    client_id=REDDIT_CLIENT_ID,
    client_secret=REDDIT_CLIENT_SECRET,
    user_agent=REDDIT_USER_AGENT
)

def get_reddit_user_details(username):
    try:
        user = reddit.redditor(username)
        return {
            "screen_name": username,
            "name": user.name,
            "verified": user.verified,
            "listed_count": user.comment_karma + user.link_karma,
            "post_karma": user.link_karma,
            "comment_karma": user.comment_karma,
            "cake_day": user.created_utc,
            "achievements": ["Popular Post", "Buzz-Worthy Post"],
            "trophy_case": ["Four-Year Club", "Verified Email"]
        }
    except Exception:
        return None
