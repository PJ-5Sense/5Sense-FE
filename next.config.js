const { type } = require('os')

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oh-sense.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '**'
      }
    ]
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
    return config
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://43.203.231.217:3000/api/:path*`
      }
      /* {
        source: '/students',
        has: [
          {
            type: 'query',
            key: 'take',
            value: '(?<take>.*)'
          },
          {
            type: 'query',
            key: 'page',
            value: '(?<page>.*)'
          },
          {
            type: 'query',
            key: 'searchBy',
            value: '(?<searchBy>.*)'
          },
          {
            type: 'query',
            key: 'name',
            value: '(?<name>.*)'
          },
          {
            type: 'query',
            key: 'phone',
            value: '(?<phone>.*)'
          }
        ],
        destination: `http://43.203.231.217:3000/students?take=:take&page=:page&searchBy=:searchBy&name=:name&phone=:phone`
      },
      {
        source: '/students/:path*',
        destination: 'http://43.203.231.217:3000/students/:path*'
      },
      {
        source: '/teachers',
        has: [
          {
            type: 'query',
            key: 'take',
            value: '(?<take>.*)'
          },
          {
            type: 'query',
            key: 'page',
            value: '(?<page>.*)'
          },
          {
            type: 'query',
            key: 'searchBy',
            value: '(?<searchBy>.*)'
          },
          {
            type: 'query',
            key: 'name',
            value: '(?<name>.*)'
          },
          {
            type: 'query',
            key: 'phone',
            value: '(?<phone>.*)'
          }
        ],
        destination: `http://43.203.231.217:3000/teachers?take=:take&page=:page&searchBy=:searchBy&name=:name&phone=:phone`
      },
      {
        source: '/teachers/:path*',
        destination: 'http://43.203.231.217:3000/teachers/:path*'
      },
      {
        source: '/billing-payments',
        has: [
          {
            type: 'query',
            key: 'take',
            value: '(?<take>.*)'
          },
          {
            type: 'query',
            key: 'page',
            value: '(?<page>.*)'
          },
          {
            type: 'query',
            key: 'searchBy',
            value: '(?<searchBy>.*)'
          },
          {
            type: 'query',
            key: 'name',
            value: '(?<name>.*)'
          },
          {
            type: 'query',
            key: 'phone',
            value: '(?<phone>.*)'
          },
          {
            type: 'query',
            key: 'PaymentStatus',
            value: '(?<PaymentStatus>.*)'
          }
        ],
        destination:
          'http://43.203.231.217:3000/billing-payments?take=:take&page=:page&searchBy=:searchBy&name=:name&phone=:phone&PaymentStatus=:PaymentStatus'
      },
      {
        source: '/billing-payments/:path*',
        destination: 'http://43.203.231.217:3000/billing-payments/:path*'
      },
      {
        source: '/lessons/filters',
        has: [
          {
            type: 'query',
            key: 'page',
            value: '(?<page>.*)'
          },
          {
            type: 'query',
            key: 'take',
            value: '(?<take>.*)'
          },
          {
            type: 'query',
            key: 'type',
            value: '(?<type>.*)'
          },
          {
            type: 'query',
            key: 'teachers',
            value: '(?<teachers>.*)'
          },
          {
            type: 'query',
            key: 'categories',
            value: '(?<categories>.*)'
          }
        ],
        destination: `http://43.203.231.217:3000/lessons/filters?page=:page&take=:take&type=:type&teachers=:teachers&categories=:categories`
      },
      {
        source: '/lesson-rooms/daily',
        has: [
          {
            type: 'query',
            key: 'date',
            value: '(?<date>.*)'
          }
        ],
        destination: 'http://43.203.231.217:3000/lesson-rooms/daily?date=:date'
      },
      {
        source: '/lesson-rooms/range',
        has: [
          {
            type: 'query',
            key: 'startDate',
            value: '(?<startDate>.*)'
          },
          {
            type: 'query',
            key: 'endDate',
            value: '(?<endDate>.*)'
          },
          {
            type: 'query',
            key: 'repeatDate',
            value: '(?<repeatDate>.*)'
          }
        ],
        destination:
          'http://43.203.231.217:3000/lesson-rooms/range?startDate=:startDate&endDate=:endDate&repeatDate=:repeatDate'
      },
      {
        source: '/lesson-rooms/:path*',
        destination: 'http://43.203.231.217:3000/lesson-rooms/:path*'
      },
      {
        source: '/lesson-categories/:path*',
        destination: 'http://43.203.231.217:3000/lesson-categories/:path*'
      },
      {
        source: '/lessons/:path*',
        destination: `http://43.203.231.217:3000/lessons/:path*`
      },
      {
        source: '/centers/:path*',
        destination: `http://43.203.231.217:3000/centers/:path*`
      },
      {
        source: '/auth/:path*',
        destination: 'http://43.203.231.217:3000/auth/:path*'
      },
      {
        source: '/duration-lessons/:path*',
        destination: 'http://43.203.231.217:3000/duration-lessons/:path*'
      },
      {
        source: '/session-lessons',
        has: [
          {
            type: 'query',
            key: 'isCheckRegistrationsCount',
            value: '(?<isCheckRegistrationsCount>.*)'
          }
        ],
        destination: 'http://43.203.231.217:3000/session-lessons?isCheckRegistrationsCount=:isCheckRegistrationsCount'
      },
      {
        source: '/session-lessons/:path*',
        destination: 'http://43.203.231.217:3000/session-lessons/:path*'
      },
      {
        source: '/session-lesson-schedules/:path*',
        destination: 'http://43.203.231.217:3000/session-lesson-schedules/:path*'
      },
      {
        source: '/session-lesson-registrations/:path*',
        destination: 'http://43.203.231.217:3000/session-lesson-registrations/:path*'
      },
      {
        source: '/duration-lesson-registrations/:path*',
        destination: 'http://43.203.231.217:3000/duration-lesson-registrations/:path*'
      } */
    ]
  },

  reactStrictMode: false
}

module.exports = nextConfig
