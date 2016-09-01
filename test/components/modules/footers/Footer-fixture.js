export default {
  menu: [{
    title: 'Privacy',
    link: 'linkto1',
  }, {
    title: 'Imprint',
    link: 'linkto2',
  }, {
    title: 'Blog',
    link: 'http://blog.drive-now.de/',
  }, {
    title: 'Secure Blog',
    link: 'https://blog.drive-now.de/',
  }],
  staticRoutes: {
    linkto1: {
      path: '/:language/linkto1',
      method: 'get',
    },
    linkto2: {
      path: '/:language/linkto2',
      method: 'get',
    },
  },
  socialmediaHeader: 'Contact',
  socialmedia: [{
    image: 'test-1.png',
    link: 'http://link-to-1',
  }, {
    image: 'test-2.png',
    link: 'http://link-to-2',
  }],
  appsHeader: 'DN Apps',
  apps: [{
    title: 'iOS',
    link: 'http://link-to-ios',
  }, {
    title: 'Android',
    link: 'http://link-to-android',
  }],
  addressHeader: 'Contact',
  address: ('DriveNow GmbH Karlstraßess 10 803333 Munich'),
};
