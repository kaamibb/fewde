/* eslint-disable max-len */
const assert = require('assert');

Feature('Favoriting Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
  I.wait(3);
});

Scenario('Favoriting one Restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.wait(3);

  I.seeElement('.resto-title');
  const TitleResto = locate('.resto-title').first();
  const firstTitleResto = await I.grabTextFrom(TitleResto);

  I.click(TitleResto);

  I.waitForElement('#likeButtonContainer', 3);
  I.click('#likeButtonContainer');
  I.wait(3);

  await I.say('Resto favorited - Screenshot');
  I.saveScreenshot('resto_favorited.png');

  I.amOnPage('/#/favorite');
  I.wait(3);
  I.seeElement('.fav-list-cont');
  await I.say('Resto in list favorited - Screenshot');
  I.saveScreenshot('resto_list_favorited.png');

  const favoritedRestoName = await I.grabTextFrom('.restaurant-fav-title a');

  assert.strictEqual(firstTitleResto, favoritedRestoName);
});


// Pengguna pertama-tama pergi ke halaman daftar restoran favorit.
// Pengguna kembali ke halaman beranda.
// Pengguna memastikan bahwa daftar restoran ditampilkan dengan nama restoran.
// Pengguna mengambil nama restoran pertama dari daftar.
// Pengguna kemudian mengklik restoran pertama untuk masuk ke detail restoran.
// Setelah menunggu elemen '#likeButtonContainer' muncul, pengguna mengkliknya untuk menambahkan restoran ke daftar favorit.
// Pengguna menyimpan tangkapan layar dengan pesan 'Resto favorited - Screenshot'.
// Pengguna kembali ke halaman daftar restoran favorit.
// Pengguna memastikan bahwa daftar restoran favorit ditampilkan.
// Pengguna menyimpan tangkapan layar lain dengan pesan 'Resto in list favorited - Screenshot'.
// Pengguna mengambil nama restoran yang telah difavoritkan.
// Pengguna memastikan bahwa nama restoran yang difavoritkan sama dengan nama restoran pertama sebelumnya.