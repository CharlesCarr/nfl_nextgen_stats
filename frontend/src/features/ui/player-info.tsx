export const PlayerInfo = ({ loading, playerData, playerName }: any) => {
  if (loading) return null;

  return (
    <>
      <p className="text-sm lg:text-base font-semibold tracking-wide mb-1">{`${playerName} - #${
        playerData && playerData["player_jersey_number"]
      }`}</p>
      <p className="font-light text-xs lg:text-sm">
        {playerData && playerData["team_abbr"]}
      </p>
    </>
  );
};
