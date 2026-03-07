# 🚗 Proje: Golf 2019 1.6 TDI - Hobi'den Girişime Uzanan Stratejik Yol Haritası

Bu doküman; **İTÜ Metalurji ve Malzeme Mühendisliği** altyapısına, **Siber Güvenlik (Linux Pentest)** tecrübesine ve "kırma/modifiye etme" tutkusuna sahip birinin, kendi aracı (2019 Golf 1.6 TDI) üzerinden otomobil yazılım/donanım sektörüne "hacker" zihniyetiyle giriş yapmasının stratejik planıdır.

Bu yolculuk iş gibi değil, tamamen bir ar-ge, hacking ve mühendislik oyunu olarak kurgulanmıştır.

---

## 🧠 FAZ 1: "Sistemi Dinle ve Tanı" (CyberSec & Yazılım Giriş)
Senin arka planın pentest olduğu için arabaya bir makine değil, "tekerlekli bir bilgisayar ağı" olarak bakmalısın. Aracın beynini (ECU - Electronic Control Unit) ve sensör ağını (CAN-bus) hackleyerek okumayı öğreneceğiz.

### 1️⃣ Araç İçi Ağlara (CAN-bus) Sızma ve Dinleme
- **Ne Yapacağız?** Linux üzerinden (tercihen Kali veya Ubuntu) `can-utils` aracılığıyla arabanın iç ağ trafiğini (CAN-bus) dinleyeceğiz.
- **Nasıl Yapacağız?** Uygun fiyatlı bir OBD2-to-USB veya CAN-Hacker cihazı alarak (örn. Raspberry Pi + PiCAN modülü veya Arduino tabanlı sistemler) arabanın teşhis portuna (OBD2) bağlanacaksın.
- **Amaç:** Direksiyonu çevirdiğinde, gaza bastığında veya sinyal verdiğinde sistemde dolaşan hex/binary veri paketlerini "sniff" etmek ve analiz etmek. (Tam bir network pentest senaryosu!)

### 2️⃣ VW Grubu Beyin Dilini Çözmek (Diagnostic)
- **Ne Yapacağız?** VAG grubunun (VW, Audi, Seat, Skoda) teşhis altyapısını kurcalamak.
- **Nasıl Yapacağız?** VCDS (VAG-COM) veya ODIS (Yetkili Servis Yazılımı) kablosu/yazılımı edineceksin. 
- **Amaç:** Sadece arıza kodu (DTC) okumak değil; aracın "Canlı Verilerini" (Live Data - Turbo basıncı, enjektör işemesi, hava/yakıt oranı vb.) sürüş esnasında izleyip kaydetmek (logging). Gizli özellikleri açıp kapatarak kodlama mantığını anlamak.

---

## 💻 FAZ 2: "Yazılıma Kusursuz Müdahale" (Chiptuning & Reverse Engineering)
Veriyi okumayı öğrendikten sonra sıra "saldırıya" yani modifikasyona geliyor.

### 1️⃣ ECU ROM (Harita) Okuma ve Yedekleme
- **Ne Yapacağız?** Motor kontrol ünitesinin içindeki .bin veya .hex formatındaki harita dosyasını indirmek.
- **Nasıl Yapacağız?** KESS v2, KTAG veya PCMFlash gibi cihazlarla (başlangıçta klon cihazlar araştırma için kullanılır) ECU'nun yedeğini alacaksın.
- **Amaç:** Fabrikasyon yazılımı bozmadan önce temiz bir majör yedeğini güvenli bir yerde saklamak. (Pentest kuralı: Her zaman geri dönüş yolun olsun).

### 2️⃣ Hex Analizi ve Yapay Zeka ile Harita Düzenleme (WinOLS)
- **Ne Yapacağız?** İndirilen o anlamsız Hexadecimal kod yığınını anlamlandırıp kırmak.
- **Nasıl Yapacağız?** WinOLS gibi sektör standartı programları kullanacaksın. İşte burada AI'dan faydalanacağız! Emme manifoldu basıncı (Boost map), yakıt püskürtme avansı (Timing map), tork limitörleri gibi adresleri bulup değiştireceğiz.
- **Amaç:** Araca Stage 1 (Sadece Yazılım) performansı yüklemek. EGR (Egzoz Gazı Geri Çevirimi) veya DPF (Dizel Partikül Filtresi) iptali gibi senaryoların yazılımda nasıl kapatıldığını kavramak.

---

## ⚙️ FAZ 3: "Malzeme Bilimi ve Fiziksel Sınırlar" (Metalurji Entegrasyonu)
Yazılımı çözdükten sonra işin fiziksel boyutuna, yani senin mühendislik disiplinine geçiyoruz. Golf 1.6 TDI'ın yazılımla bir sınırı vardır, o sınırı geçtiğinde metaller erimeye veya kırılmaya başlar.

### 1️⃣ Termal Dinamikler ve DPF/EGR iptali
- **Mantık:** Daha yüksek güç, daha yüksek Egzoz Gazı Sıcaklığı (EGT) demektir. 
- **Malzeme Bilimi:** Turbo pallerinin ve egzoz manifoldundaki alaşımların hangi sıcaklıklara kadar dayanabileceğini hesaplayacaksın. DPF iptali yapıldığında yerine takılacak "Downpipe" borusunun alaşımı (Paslanmaz Çelik 304 vs 316) ve ısı yalıtım sargılarının analizini yapacaksın.

### 2️⃣ Turbo Büyütme (Hybrid Turbo) Teorileri
- **Mantık:** Fabrikasyon turbonun içindeki (Compressor ve Turbine wheel) pervaneleri daha hafif ve aerodinamik olarak verimli olan (örn: Billet Alüminyum) daha büyük pervanelerle değiştirmek.
- **Malzeme Bilimi:** Titanyum alaşımlar veya hafifleştirilmiş forged pervanelerin turbodaki "Lag" (Gecikme) süresine etkisini hesaplamak.

---

## 💰 FAZ 4: "Hobiden İmparatorluğa" (Ticarileşme Modeli)
Zamanı geldiğinde bu bilgi birikimini nasıl paraya çevireceğiz?

1.  **Dost/Çevre Garajı (Underground Phase):** Kendi aracını sorunsuz yürüttükten sonra, ilk müşterilerin arkadaşların ve okul/forum çevren olacak. Düşük maliyetle onların da araçlarındaki yazılımları (Güvenli sınırlar içinde) modifiye edeceksin.
2.  **Dosya Servisi (File Service - Gelişmiş):** Sadece sanayiye dükkan açmana gerek yok! İyi bir yazılımcı (Tuner) olup kendi .bin / modifiye edilmiş ECU dosyalarını internet üzerinden global veya yerel garajlara satabilirsin (B2B model). Usta kabloyu takıp arabayı okur, sana dosyayı gönderir; sen pentestçi/hacker kafasıyla haritayı düzenleyip satarsın.
3.  **Kendi Alaşım/Donanım Markan (Metalurji Gücü):** İşler ilerlediğinde mühendislik bilgini kullanarak kendi "Isıya ekstra dayanıklı", özel tasarım performans parçalarını (Downpipe, intercooler boruları vs.) çizip ürettirerek satabilirsin.

---
## Sonraki Adım: Nereden Başlıyoruz?
Bu 4 Fazlık yol haritasının **FAZ 1 - Adım 1'indeyiz**.

İlk hedefimiz Golf'ün sadece kaputunu açmak değil, "terminalden içine sızmak" olmalı. **VCDS (VAG-COM) kablosu** alarak OBD portundan bağlanmakla ve arabanın beynini okumakla ilgili adım adım bir "Hack" dokümanı hazırlamamı ister misin?
