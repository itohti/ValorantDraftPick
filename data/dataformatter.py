import pandas as pd

# Load the form data
df = pd.read_csv("./data/tournamentResponses.csv")

# Rename columns for clarity
df_cleaned = df.rename(columns={
    "Your Name": "Name",
    "Your highest rank achieved on your main": "PeakRank",
    "Your current rank on your main": "CurrentRank",
    "Do you have any teammate preferences? While we can't guarantee you'll be placed with them, listing preferences will increase your chances.": "TeammatePreferences",
    "Role preferences": "Roles",
    "In game name (including #)": "IGN",
})

df_cleaned = df_cleaned.fillna("")

# Clean whitespace
for col in df_cleaned.select_dtypes(include='object'):
    df_cleaned[col] = df_cleaned[col].map(lambda x: x.strip() if isinstance(x, str) else x)

# Define rank order
rank_order = {
    "Iron": 1,
    "Bronze": 2,
    "Silver": 3,
    "Gold": 4,
    "Plat": 5,
    "Diamond": 6,
    "Ascendant": 7,
    "Immortal": 8,
    "Radiant": 9
}

# Add a numeric column for sorting
df_cleaned["CurrentRankOrder"] = df_cleaned["CurrentRank"].map(rank_order)
df_cleaned["PeakRankOrder"] = df_cleaned["PeakRank"].map(rank_order)

# Sort by rank descending (highest to lowest)
df_sorted = df_cleaned.sort_values(by=["CurrentRankOrder", "PeakRankOrder"], ascending=[False, False])

df_cards = df_sorted[["Name", "PeakRank", "CurrentRank", "TeammatePreferences", "Roles", "IGN"]]

df_cards.to_csv("./src/player_cards.csv", index=False)
df_cards.to_json("./src/player_cards.json", orient="records", indent=2)
