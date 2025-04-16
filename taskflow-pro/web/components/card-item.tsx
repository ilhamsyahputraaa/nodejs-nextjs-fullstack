import React from 'react'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { IconTrendingUp } from '@tabler/icons-react'
import { Badge } from './ui/badge'

type CardType = {
title:string,
value:string,
percentage:number,
legend:string,
description:string
}
export default function CardItem({title, value, percentage, legend, description}:CardType) {
  return (
    <div>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              {percentage} {" "}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {legend} <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {description}
         </div>
        </CardFooter>
      </Card>
    </div>
  )
}
