'use client'
import { leaderboardAtom, statsAtom } from "@/state";
import { formatAddress, formatBalance } from "@/util";
import Counter from "react-countup";
import { useRecoilValue } from "recoil";
import { Box, Card, CardBody, CardHeading, Container, Text } from "../common";

const Leaderboard = () => {
  const leaderboard = useRecoilValue(leaderboardAtom)
  const stats = useRecoilValue(statsAtom)

  const data = [
    { title: "Painter", value: leaderboard.leaderboard.length },
    { title: "Strokes", value: stats.stats.strokes },
    { title: "Whale", value: stats.stats.deposits / 1_000_000 },
  ]

  return (
    <Card className="w-[80vh] max-h-[80vh]">
      <CardHeading>Leaderboard</CardHeading>
      <CardBody>
        <Container className="w-full flex flex-row gap-4 justify-between items-center">
          {data.map((item, index) => (
            <Box className="flex-grow flex flex-col items-center justify-center gap-2" key={index}>
              <Text className="text-md font-medium text-center w-full">{item.title}</Text>
              <Counter start={0} end={item.value} className="text-neutral-300 text-center w-full" />
            </Box>
          ))}
        </Container>
        <Container className="max-h-[40vh] w-full overflow-y-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                {
                  ["Rank", "Painter", "Strokes", "Whale"]
                    .map((e, i) => <th key={i} className="text-md font-medium text-left pb-1">{e}</th>)
                }
              </tr>
            </thead>
            <tbody>
              {[...leaderboard.leaderboard]
                .sort((a, b) => b.strokes - a.strokes)
                .map((item, index) => (
                  <tr key={index}>
                    <td className="text-md text-left pt-1">{`#${index + 1}`}</td>
                    <td className="text-md text-left pt-1 hover:text-neutral-200"><a target="_blank" href={`https://ping.pub/migaloo/account/${item.painter}`}>{formatAddress(item.painter)}</a></td>
                    <td className="text-md text-left pt-1">{item.strokes}</td>
                    <td className="text-md text-left pt-1">{formatBalance(item.deposits)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Container>
      </CardBody>
    </Card>
  )
}
export default Leaderboard
