import { NextResponse } from 'next/server'

const legislators = {
  representatives: [
    {
      name: 'Iris Rudder',
      role: 'Representative',
      email: 'iris.rudder@capitol.tn.gov',
      phone: '(615) 741-8695',
      address: {
        street: '425 Rep. John Lewis Way N.',
        suite: 'Suite 576 Cordell Hull Building',
        city: 'Nashville',
        state: 'TN',
        zip: '37243'
      }
    }
  ],
  senators: [
    {
      name: 'Janice Bowling',
      role: 'Senator',
      email: 'janice.bowling@capitol.tn.gov',
      phone: '(615) 741-6694',
      address: {
        street: '425 Rep. John Lewis Way N.',
        suite: 'Suite 718 Cordell Hull Building',
        city: 'Nashville',
        state: 'TN',
        zip: '37243'
      }
    }
  ]
}

export async function GET() {
  return NextResponse.json(legislators)
}
