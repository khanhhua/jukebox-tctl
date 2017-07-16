const CLOUDANT_KEY = 'rpaistationtrostasceltys';
const CLOUDANT_PASSWORD = '63a1536f35ee47f0ecace0b3c8261ff486e5a774';

function dbGET (url, transformer=null) {
  return fetch(url, {
    headers: {
      'Authorization': `Basic ${btoa(CLOUDANT_KEY + ':' + CLOUDANT_PASSWORD)}`
    }
  }).then(res => {
    return res.json();
  }).then(({rows}) => {
    if (transformer) {
      return transformer(rows);
    }

    return rows;
  });
}

function dbPOST(url, data, transformer=null) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(CLOUDANT_KEY + ':' + CLOUDANT_PASSWORD)}`
    },
    body: JSON.stringify(data)
  }).then(res => {
    return res.json();
  }).then(({rows}) => {
    if (transformer) {
      return transformer(rows);
    }

    return rows;
  });
}

export function getAlbums () {
  const url = `https://fatmandesigner-blog.cloudant.com/hymnals/_design/album/_view/public-albums?limit=10&reduce=false`;

  return dbGET(url, (data) => data.map(item => (item.value.id=item.value._id, item.value) ));
}

export function getSongsByIds (ids=[]) {
  const url = `https://fatmandesigner-blog.cloudant.com/hymnals/_design/song/_view/public-songs`;

  return dbPOST(url, {keys: ids}, (data) => data.map(({value:item}) => (item.id=item._id, item) ));
}
