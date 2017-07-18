// 'https://vietchristian.com/thanhca/result.asp' -H 'Pragma: no-cache' -H 'Origin: https://vietchristian.com' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en,fr;q=0.8,de;q=0.6,en-US;q=0.4,vi;q=0.2' -H 'Upgrade-Insecure-Requests: 1' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'Cache-Control: no-cache' -H 'Referer: https://vietchristian.com/thanhca/' -H 'Cookie: ASPSESSIONIDQWBQDRBB=BHEKFNCDJENDJJOGKFEELNJJ; _gat=1; __qca=P0-454950366-1500416999272; fbm_115394941815925=base_domain=.vietchristian.com; _ga=GA1.2.640683876.1500416999; _gid=GA1.2.1671009318.1500416999; fbsr_115394941815925=yqUhCdYGbmHKpCL0nO095joOuOxuh3FI0OhFE1Cmuic.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUN2MTlNTnQ1NWZRdFdYX0w0UlVaS3prRDhhczNlLWVWelFoVUthLU03OXFpOUcwUjcyaTB4QU03NFdIbGg2cEttblM4eGxRQm52NVhha2lGcy0tNmp5M2ZtNkZsYlA1Y093T0lPX1VoRDBLWk1DMzhqdU5FcFlYUXNLanV0Qy1Vc245YUtycGpWdWgtdDdXUXZvT0hQaE1nMGJaa091X2VFbTQyUmUwOFM3aXljVmNsYVR2aHkzY1FCc21EN1VoQnhKVl9VWmpfWG9sUDlqVEg3VVV2RFVCajFVdGdnZmd3T1M3V0ZwZ1dBZXc2anpkNy10VEZqeGxEcTdyOFlVUmM2Y1B2UFY0UnFtcDBsQmcweWY1OVR4RUVDRXc3ZU40SHRXMjMzd1M4UWJia3BxTEdiekxUYlhjbzNZSjhoNzI0RGEtNnI1bkhuQmktRWYzbGxhWVYtaSIsImlzc3VlZF9hdCI6MTUwMDQxNzAyNywidXNlcl9pZCI6IjU1MjYyNjY3MyJ9' -H 'Connection: keep-alive' --data 'vn=1&Searchtype=index&hid=1' --compressed"

const request = require('request');
const {JSDOM} = require('jsdom');

const baseURL = 'https://vietchristian.com';
const url = `${baseURL}/thanhca/result.asp`;
const headers = {
  Pragma: 'no-cache',
  Origin: 'https://vietchristian.com',
 'Accept-Encoding': 'gzip, deflate, br',
 'Content-Type': 'application/x-www-form-urlencoded',
 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
 'Cache-Control': 'no-cache',
 // 'Cookie': 'ASPSESSIONIDQWBQDRBB=BHEKFNCDJENDJJOGKFEELNJJ; _gat=1; __qca=P0-454950366-1500416999272; fbm_115394941815925=base_domain=.vietchristian.com; _ga=GA1.2.640683876.1500416999; _gid=GA1.2.1671009318.1500416999; fbsr_115394941815925=yqUhCdYGbmHKpCL0nO095joOuOxuh3FI0OhFE1Cmuic.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUN2MTlNTnQ1NWZRdFdYX0w0UlVaS3prRDhhczNlLWVWelFoVUthLU03OXFpOUcwUjcyaTB4QU03NFdIbGg2cEttblM4eGxRQm52NVhha2lGcy0tNmp5M2ZtNkZsYlA1Y093T0lPX1VoRDBLWk1DMzhqdU5FcFlYUXNLanV0Qy1Vc245YUtycGpWdWgtdDdXUXZvT0hQaE1nMGJaa091X2VFbTQyUmUwOFM3aXljVmNsYVR2aHkzY1FCc21EN1VoQnhKVl9VWmpfWG9sUDlqVEg3VVV2RFVCajFVdGdnZmd3T1M3V0ZwZ1dBZXc2anpkNy10VEZqeGxEcTdyOFlVUmM2Y1B2UFY0UnFtcDBsQmcweWY1OVR4RUVDRXc3ZU40SHRXMjMzd1M4UWJia3BxTEdiekxUYlhjbzNZSjhoNzI0RGEtNnI1bkhuQmktRWYzbGxhWVYtaSIsImlzc3VlZF9hdCI6MTUwMDQxNzAyNywidXNlcl9pZCI6IjU1MjYyNjY3MyJ9'
}
const data = 'vn=1&Searchtype=index&hid=1';

request.post({url, headers, form: data, gzip: true}, (err, res, body) => {
  // console.log(body.toString('utf8'));

  const document = new JSDOM(body.toString('utf8')).window.document;
  const rows = Array.prototype.slice.call(document.querySelectorAll("table tr"), 1, 2);

  rows.forEach((row) => {
    const td = row.querySelector('td:nth-child(2)');

    const title = td.childNodes[0].textContent;
    const anchor = td.children[3].getAttribute('href');

    console.log('Title:', title);
    console.log('Anchor:', anchor);

    request.get({url: `${baseURL}${anchor}`, headers, gzip: true}, (err, res, body) => {
      // console.log(body);

      // DecodeMedia("http%3A%2C%2Cvietchristian%2Ecom%2Cau%2Ctcbm%2C001%2Emp3")
      const rgx = /DecodeMedia\("(.+)"\)/gi;
      const matches = rgx.exec(body);
      const mediaLink = matches[1];
      console.log('MP3:', decodeURIComponent(mediaLink).replace(/,/g,'/'));
    })
  })
});
