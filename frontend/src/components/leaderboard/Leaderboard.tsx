'use client'
import { DECIMALS, ONE } from '@/constants'
import { leaderboardAtom, statisticsAtom } from '@/state'
import { exploreAccount, formatAddress, formatBalance } from '@/util'
import Counter from 'react-countup'
import { useRecoilValue } from 'recoil'
import { Box, Card, CardBody, CardHeading, Container, Link, Text } from '../common'

const Leaderboard = (): JSX.Element => {
  const { leaderboard } = useRecoilValue(leaderboardAtom)
  const stats = useRecoilValue(statisticsAtom)

  const data = [
    { title: 'Painter', value: leaderboard.length },
    { title: 'Strokes', value: stats.strokes },
    { title: 'Whale', value: stats.deposits / DECIMALS }
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
        <table className="w-full">
          <thead>
            <tr className='flex w-full pb-2'>
              <th className="text-md font-medium text-left w-1/4">Rank</th>
              <th className="text-md font-medium text-right w-1/4">Painter</th>
              <th className="text-md font-medium text-right w-1/4">Strokes</th>
              <th className="text-md font-medium text-right w-1/4">Whale</th>
            </tr>
          </thead>
          <tbody className="hide-scrollbar max-h-[30vh] bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full">

            {[...leaderboard]
              .sort((a, b) => b.strokes - a.strokes)
              .map((item, index) => (
                <tr key={index} className="flex w-full pt-1">
                  <td className="text-md text-left w-1/4">{`#${index + ONE}`}</td>
                  <td className="text-md text-right w-1/4"><Link target="_blank" href={exploreAccount(item.painter)} rel="noreferrer">{formatAddress(item.painter)}</Link></td>
                  <td className="text-md text-right w-1/4">{item.strokes}</td>
                  <td className="text-md text-right w-1/4">{formatBalance(item.deposits)}</td>
                </tr>
              ))}

          </tbody>

        </table>
      </CardBody>
    </Card>
  )
}
export default Leaderboard
