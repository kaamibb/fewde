const assert = require('assert');

Feature('Unfavoriting Restaurants');
let firstTitleResto;
Before(async ({ I }) => {
    I.amOnPage('/');
    I.wait(3);
  
    I.seeElement('.resto-title');
    const TitleResto = locate('.resto-title').first();
    firstTitleResto = await I.grabTextFrom(TitleResto);
  
    I.click(TitleResto);
  
    I.waitForElement('#likeButtonContainer', 3);
    I.click('#likeButtonContainer');
    I.wait(3);
  
    I.amOnPage('/#/favorite');
});

Scenario('Unfavoriting one Restaurant', async ({ I }) => {
  I.seeElement('.fav-list-cont');

  const favoritedRestoName = await I.grabTextFrom('.restaurant-fav-title a');

  assert.strictEqual(firstTitleResto, favoritedRestoName);

  I.click(favoritedRestoName);
  I.waitForElement('#likeButtonContainer');
  I.click('#likeButtonContainer');
  I.wait(3);
  await I.say('Resto unfavorited - Screenshot');
  I.saveScreenshot('resto_unfavorited.png');
  I.amOnPage('/#/favorite');
  I.wait(3);
  I.seeElement('.fav-list-cont');
  await I.say('Resto in list unfavorited - Screenshot');
  I.saveScreenshot('resto_list_unfavorited.png');
  I.dontSeeElement('.restaurant-fav-title a');
});


// Pengguna berada di halaman beranda.
// Pengguna melihat daftar restoran yang ditampilkan dengan nama restoran.
// Pengguna kemudian mengklik restoran pertama di daftar tersebut.
// Pengguna mengklik tombol favorit untuk menambahkan restoran tersebut ke daftar favorit.
// Setelah itu, pengguna kembali ke halaman daftar favorit.
// Pada skenario 'Unfavoriting one Restaurant':
// Pengguna memastikan bahwa daftar restoran favorit ditampilkan.
// Pengguna mengambil nama restoran yang telah difavoritkan sebelumnya.
// Pengguna membandingkan nama restoran yang difavoritkan dengan nama restoran pertama.
// Jika kedua nama restoran sama, pengguna mengklik nama restoran tersebut.
// eslint-disable-next-line max-len
// Pengguna menunggu hingga elemen '#likeButtonContainer' muncul, lalu mengkliknya lagi untuk menghapus restoran dari daftar favorit.
// Pengguna menyimpan tangkapan layar dengan pesan 'Resto unfavorited - Screenshot'.
// Pengguna kembali ke halaman favorit.
// Pengguna memastikan bahwa daftar restoran favorit tetap ditampilkan.
// Pengguna menyimpan tangkapan layar lain dengan pesan 'Resto in list unfavorited - Screenshot'.
// eslint-disable-next-line max-len
// Pengguna memastikan bahwa elemen dengan kelas '.restaurant-fav-title a' tidak lagi terlihat di halaman.