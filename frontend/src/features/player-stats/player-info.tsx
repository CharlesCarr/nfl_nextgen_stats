export const PlayerInfo = ({ loading, playerData, playerName }: any) => {
  return (
    <>
      <p className="text-sm lg:text-base font-semibold tracking-wide mb-1">{`${playerName} - #${
        !loading && playerData ? playerData["player_jersey_number"] : ""
      }`}</p>
      <p className="font-light text-xs lg:text-sm">
        {!loading && playerData ? playerData["team_abbr"] : ""}
      </p>
    </>
  );
};
