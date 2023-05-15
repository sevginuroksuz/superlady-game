# Super-Lady-Game
Vanilla javascript ve HTML canvas kullanarak 2d sprite sheetlerin de yardımıyla çok keyifli hale gelmiş basic bir oyun. Klasik super mario tarzı isimler vermek ve onlara cok da fazla benzetmek istemediğim için (adı süper lady :)) özgün pixel art eserlerini elimden geldiğince bir araya getirip kullanmaya çalıştım.

# Projeyi Nasıl Çalıştırırım?
Projede HTML canvas ve vanilla javascript kullanıldı. Yani sadece bir html, bir js ve resim klasöründen oluşuyor. Html sayfasında javascript kodlarını script  koyarak dahil edebiliyoruz. Kısacası html dosyasını tarayıcınızda çalıştırırsanız sayfanızı kolaylıkla görebilirsiniz.


# Proje Hakkında Detaylı Bilgi
Proje html ve javascript dosyalarından oluşuyor. Ayrıca kullandığım sprite sheet, platform, background gibi tüm materyaller projenin içinde bulunuyor. Bakmak veya siz de geliştirmek isterseniz indirebilirsiniz. Ben vscode da kodlarımı yazdım ve çalıştırdım fakat video baz alarak çalıştığım bu projede atom editörünü kullanıyordu projeyi geliştirmede yararlandığım kişi. Gayet güzel içerikleri var bakmanızı tavsiye ederim. (Chris Courses)

Projeyi geliştirirken sprite sheet şeklinde yapılan animasyonların daha pratik olduğunu gördüm kısıtlı bir zamanım olduğu için diğer bir yöntem olan animasyonu oluşturan resimleri ayrı ayrı dizilerde tutup döngüyle animasyon oluşturmayı tercih etmedim. Ama pixel arta ve oyun sektörüne aşina olmadığım için biraz zorladı. Sprite sheet kullanırken her bir animasyon karesinin hesaplanıp parametre olarak animate(); fonksiyonuna verilmesi gerekiyor. Bu konuda dikkatli olmanızı tavsiye ederim. Bir de her siteden değil de profesyonel olarak bu işi yapanların çizimlerinden yararlenırsanız sizin için çok daha keyifli bir süreç olacaktır.

# Sprite Sheet Örneği
![image](https://github.com/sevginuroksuz/Super-Lady-Game/assets/90787721/93751195-a73f-422c-99cb-cb9c44a001c1)


Oyunda oyuncu biribirinden ayrılmış platformlara düşünce,kakatüs ve kaverengi mantara değince ölüyor. Kırmızı mantar zararlı değil onun için ve ayrıca kahverengi duvarlar oyuncunun tehlikeleri çabuk atlatabilmesi için bir nevi platform işlevi görüyor. Fakat ben bu projede nesnelere değince ölme kısmını tam kafamda oturtamadığım için yapamadım. Oyuncu platformlar arası boşluğa düşünce ölüyor kaybettiniz yazısı yazıyor ve oyun tekrar başlıyor. Skor ve can hesabı yapamadığım için platformda engellerin hepsini aşınca "TEBRİKLER KAZANDINIZ" yazıyor ve oyuncu bir süre daha ilerlerse oyun kendiğinden tekrar başlatılıyor. Oyuncu platformdan çıkamıyor.

# Oyun Başladığında Açılan Sayfa
![image](https://github.com/sevginuroksuz/Super-Lady-Game/assets/90787721/98eac7b5-73c5-4e9b-901b-a0b59146794e)

# Oyuncu Kahverengi Duvarları Platform Gibi Kullanabilir
![image](https://github.com/sevginuroksuz/Super-Lady-Game/assets/90787721/6e919219-f8b2-4527-91ee-d777c2e18b34)

# Oyun Kazanınca Gelen Sayfa
![image](https://github.com/sevginuroksuz/Super-Lady-Game/assets/90787721/666356e2-bfc5-4d11-bfe8-bd18b12cd36c)

