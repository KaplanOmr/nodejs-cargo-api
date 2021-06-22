# cargo-api

> Proje **NoSQL** ve **JSON** dosyasını veri tabanı olarak kullanan 2 alt koldan oluşmaktadır. Veri Tabanı türlerine göre klasör isimlendirmesi yapılarak birbirlerinden ayrılmıştır.

## Giriş

---

Api'ye istek gönderebilmeniz için öncelikle giriş yapmanız gerekmektedir.

```
{url}/login
```

Yukarıda belitilen adrese, servis sağlayacınız tarafından oluşturulan kullanıcı bilgileri ile sunucuya _post_ isteği göndermeniz gerekmektedir.

```
username: string,
password: string,
token: string
```

Bu işlem sonucunda sizlere **token** değeri gönderilmektedir. Bu tokeni istekleriniz esnasında Bearer Token olarak göndermeniz gerekmektedir.

## Şehir Listesi

---

Şube arama ve listeleme işlemlerinde kullanmanız illere ve illere ait sluglara ulaşabilirsiniz.

```
{url}/cities
```

Belirtilen adrese _get_ ile istek göndermeniz yeterlidir.

## Kargo Firmaları

---

Kargo şubelerini firmaya göre filtrelemek için firma adlarına ve sluglarına ihtiyacınız vardır. Bunları alt alanda belirtilen adresten _get_ isteği ile alabilirsiniz.

```
{url}/cargo-companies
```

## Şubeler (Firma ve Şehir)

---

Kargo firmasına ait belirli bir şehirdeki tüm şubeleri listelemek için kullanılır. İstek _get_ methodu ile gönderilmelidir.

```
{url}/branches/cargo-city/:cargo_slug/:city_clug
```

## Şubeler (Firma)

---

Kargo firmasına ait tüm şubeleri listelemek için kullanılır. İstek _get_ methodu ile gönderilmelidir.

```
{url}/branches/cargo/:cargo_slug
```

## Şubeler (Şehir)

---

Şehirde bulunan tüm şubeleri listelemek için kullanılır. İstek _get_ methodu ile gönderilmelidir.

```
{url}/branches/city/:city_slug
```
