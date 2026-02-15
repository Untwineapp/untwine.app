import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Wind, Brain, HelpCircle, Anchor, X, ArrowRight, Settings, 
  Trash2, Check, Globe, ChevronDown, Download, Upload, Heart, GitFork, 
  Compass, Shield, WifiOff, Database, BellOff, Smartphone, Share, Plus, Infinity,
  FileText 
} from 'lucide-react';

/**
 * UNTWINE - Privacy-First Mental Reset App
 * * Core Philosophy:
 * - Offline-first
 * - Local-only storage
 * - No tracking, no accounts
 * - Calm, non-clinical tone
 * - Global Accessibility (25+ Languages)
 */

// --- Assets & Constants ---

const COLORS = {
  bg: '#2F3A32',        // Deep Moss Green (App BG)
  lightBg: '#F3F2EE',   // Warm Off-White (Landing Page BG)
  surface: '#3A453D',   // Secondary Surface (App)
  lightSurface: '#FFFFFF', // Landing Page Cards
  accent: '#9FAF95',    // Sage Rope Green
  active: '#B4C2A7',    // Focus / Active
  text: '#E6E8E2',      // Primary Text (App)
  darkText: '#2F3A32',  // Primary Text (Landing)
  subtext: '#6F7A6A',   // Secondary Text
  ground: '#C9B7A2',    // Soft Grounding Cue
};

// --- Localization Data ---

const createPrivacy = (t, s1, s2, s3, s4, s5, s6, s7) => ({
  title: t,
  sections: [
    { heading: "1. Core Promise", body: s1 },
    { heading: "2. Data Storage", body: s2 },
    { heading: "3. Backups", body: s3 },
    { heading: "4. Voice Privacy", body: s4 },
    { heading: "5. Medical Disclaimer", body: s5 },
    { heading: "6. Analytics", body: s6 },
    { heading: "7. Contact", body: s7 }
  ]
});

const PRIVACY_CONTENT = {
  en: createPrivacy(
    "Untwine Privacy Policy",
    "Untwine was built on a simple premise: Your mental space is private. Unlike most mental health apps, Untwine does not have a cloud database. We do not require you to create an account, log in, or provide an email address. We do not track your location, your usage habits, or the content of your thoughts.\n\n\"What happens on your phone, stays on your phone.\"",
    "Untwine uses a technology called Local Storage.\n\nEverything you type (History logs, Stop Overthinking inputs, Ground Me exercises) is saved directly onto your device's internal memory.\n\nNo data leaves your device. We do not have servers that receive, process, or store your personal text.\n\nImportant Risks of Local Storage:\nBecause your data is only on your device:\n\n• If you clear your browser cache/data, your Untwine history will be erased.\n• If you use \"Incognito\" or \"Private\" mode, your data will be erased as soon as you close the tab.\n• If you lose your phone, your data is lost (unless you have created a manual Backup).",
    "Since we do not sync your data to the cloud, moving data between devices must be done manually by you.\n\nExport: You can download a json file containing your entire history from the Settings menu.\n\nImport: You can restore your history by uploading that file on a new device.",
    "Untwine uses your device's built-in Speech Recognition API (Web Speech API).\n\nYour voice data is processed locally on your device where supported.\n\nWe do not record, save, or transmit audio files to our servers.",
    "Untwine is not a medical device. It is a self-help utility designed for mild stress management and decision-making support.\n\nThe content and tools in this app are not a substitute for professional medical advice, diagnosis, or treatment.\n\nCrisis Situations: If you are in danger, feeling suicidal, or experiencing a medical emergency, do not use this app. Please call your local emergency services or use the link https://findahelpline.com/ to find a helpline.",
    "We use zero (0) third-party tracking scripts.\n\n• No Google Analytics.\n• No Facebook Pixels.\n• No Advertising SDKs.\n\nThe only external link in the app is to findahelpline.com. If you click that link, you are subject to their privacy policy.",
    "If you have questions or suggestions, you can reach us at: contact@untwine.app"
  ),
  es: createPrivacy(
    "Política de Privacidad de Untwine",
    "Untwine se construyó sobre una premisa simple: Su espacio mental es privado. A diferencia de la mayoría de las aplicaciones de salud mental, Untwine no tiene una base de datos en la nube. No requerimos que cree una cuenta, inicie sesión ni proporcione una dirección de correo electrónico. No rastreamos su ubicación, sus hábitos de uso ni el contenido de sus pensamientos.\n\n\"Lo que sucede en su teléfono, se queda en su teléfono.\"",
    "Untwine utiliza una tecnología llamada Almacenamiento Local.\n\nTodo lo que escribe (registros de historial, entradas de Detener Pensamientos, ejercicios de Conéctame) se guarda directamente en la memoria interna de su dispositivo.\n\nNingún dato sale de su dispositivo. No tenemos servidores que reciban, procesen o almacenen su texto personal.\n\nRiesgos importantes del Almacenamiento Local:\nDebido a que sus datos solo están en su dispositivo:\n\n• Si borra la memoria caché/datos de su navegador, su historial de Untwine se borrará.\n• Si utiliza el modo \"Incógnito\" o \"Privado\", sus datos se borrarán tan pronto como cierre la pestaña.\n• Si pierde su teléfono, sus datos se perderán (a menos que haya creado una copia de seguridad manual).",
    "Dado que no sincronizamos sus datos con la nube, el movimiento de datos entre dispositivos debe hacerlo usted manualmente.\n\nExportar: Puede descargar un archivo json que contiene todo su historial desde el menú Configuración.\n\nImportar: Puede restaurar su historial cargando ese archivo en un nuevo dispositivo.",
    "Untwine utiliza la API de reconocimiento de voz integrada en su dispositivo (Web Speech API).\n\nSus datos de voz se procesan localmente en su dispositivo donde sea compatible.\n\nNo grabamos, guardamos ni transmitimos archivos de audio a nuestros servidores.",
    "Untwine no es un dispositivo médico. Es una utilidad de autoayuda diseñada para el manejo del estrés leve y el apoyo en la toma de decisiones.\n\nEl contenido y las herramientas de esta aplicación no sustituyen el consejo, diagnóstico o tratamiento médico profesional.\n\nSituaciones de crisis: Si está en peligro, se siente suicida o experimenta una emergencia médica, no utilice esta aplicación. Llame a sus servicios de emergencia locales o utilice el enlace https://findahelpline.com/ para encontrar una línea de ayuda.",
    "Utilizamos cero (0) scripts de rastreo de terceros.\n\n• Sin Google Analytics.\n• Sin Facebook Pixels.\n• Sin SDK de publicidad.\n\nEl único enlace externo en la aplicación es a findahelpline.com. Si hace clic en ese enlace, está sujeto a su política de privacidad.",
    "Si tiene preguntas o sugerencias, puede comunicarse con nosotros en: contact@untwine.app"
  ),
  fr: createPrivacy(
    "Politique de Confidentialité",
    "Untwine repose sur un principe simple : votre espace mental est privé. Pas de base de données cloud. Pas de compte requis.\n\n\"Ce qui se passe sur votre téléphone reste sur votre téléphone.\"",
    "Untwine utilise le stockage local. Tout est enregistré sur la mémoire interne de votre appareil. Aucune donnée ne quitte votre appareil.\n\nRisques importants :\n\n• Vider le cache du navigateur efface l'historique.\n• Le mode Incognito efface les données à la fermeture.\n• Si vous perdez votre téléphone, vous perdez vos données (sauf sauvegarde manuelle).",
    "Pas de synchronisation cloud. Le transfert est manuel.\n\nExporter : Téléchargez un fichier JSON depuis les Paramètres.\n\nImporter : Restaurez l'historique en téléversant ce fichier.",
    "Nous utilisons l'API de reconnaissance vocale de votre appareil. Les données vocales sont traitées localement. Nous n'enregistrons pas d'audio.",
    "Untwine n'est pas un dispositif médical. C'est un outil d'auto-assistance.\n\nSituations de crise : Si vous êtes en danger, n'utilisez pas cette application. Appelez les urgences ou visitez https://findahelpline.com/.",
    "Zéro (0) script de suivi.\n\n• Pas de Google Analytics.\n• Pas de pixels Facebook.\n• Pas de publicité.",
    "Contact : contact@untwine.app"
  ),
  de: createPrivacy(
    "Datenschutzerklärung",
    "Untwine basiert auf einem einfachen Prinzip: Ihr geistiger Raum ist privat. Keine Cloud-Datenbank. Keine Konten erforderlich.\n\n\"Was auf Ihrem Handy passiert, bleibt auf Ihrem Handy.\"",
    "Untwine nutzt lokalen Speicher. Alles wird direkt auf dem internen Speicher Ihres Geräts gesichert. Keine Daten verlassen Ihr Gerät.\n\nWichtige Risiken:\n\n• Das Löschen des Browser-Cache löscht Ihren Verlauf.\n• Der Inkognito-Modus löscht Daten beim Schließen.\n• Bei Verlust des Handys sind Daten verloren (ohne manuelles Backup).",
    "Da wir nicht mit der Cloud synchronisieren, erfolgt die Datenübertragung manuell.\n\nExport: Laden Sie eine JSON-Datei in den Einstellungen herunter.\n\nImport: Stellen Sie den Verlauf durch Hochladen dieser Datei wieder her.",
    "Wir nutzen die Spracherkennungs-API Ihres Geräts. Sprachdaten werden lokal verarbeitet. Wir zeichnen keine Audiodateien auf.",
    "Untwine ist kein Medizinprodukt. Es ist ein Selbsthilfewerkzeug.\n\nKrisensituationen: Bei Gefahr nutzen Sie diese App nicht. Rufen Sie den Notruf oder besuchen Sie https://findahelpline.com/.",
    "Wir verwenden null (0) Tracking-Skripte.\n\n• Kein Google Analytics.\n• Keine Werbung.",
    "Kontakt: contact@untwine.app"
  ),
  it: createPrivacy(
    "Informativa sulla Privacy",
    "Il tuo spazio mentale è privato. Nessun database cloud. Nessun account richiesto.\n\n\"Ciò che accade nel tuo telefono, resta nel tuo telefono.\"",
    "Untwine usa l'archiviazione locale. Tutto viene salvato nella memoria interna del dispositivo. Nessun dato lascia il dispositivo.\n\nRischi importanti:\n\n• Cancellare la cache del browser cancella la cronologia.\n• La modalità in incognito cancella i dati alla chiusura.\n• Se perdi il telefono, perdi i dati (senza backup manuale).",
    "Nessuna sincronizzazione cloud. Il trasferimento dati è manuale.\n\nEsporta: Scarica un file JSON dalle Impostazioni.\n\nImporta: Ripristina la cronologia caricando quel file.",
    "Usiamo l'API di riconoscimento vocale del dispositivo. I dati vocali sono elaborati localmente. Non registriamo audio.",
    "Untwine non è un dispositivo medico. È uno strumento di auto-aiuto.\n\nSituazioni di crisi: Se sei in pericolo, non usare questa app. Chiama i soccorsi o visita https://findahelpline.com/.",
    "Usiamo zero (0) script di tracciamento.\n\n• Niente Google Analytics.\n• Niente pubblicità.",
    "Contatto: contact@untwine.app"
  ),
  pt: createPrivacy(
    "Política de Privacidade",
    "Seu espaço mental é privado. Sem banco de dados na nuvem. Sem contas.\n\n\"O que acontece no seu telefone, fica no seu telefone.\"",
    "Usamos Armazenamento Local. Tudo é salvo na memória interna do dispositivo. Nenhum dado sai do seu aparelho.\n\nRiscos Importantes:\n\n• Limpar o cache apaga o histórico.\n• Modo Anônimo apaga dados ao fechar.\n• Se perder o telefone, perde os dados (sem backup manual).",
    "Não sincronizamos com a nuvem.\n\nExportar: Baixe um arquivo JSON em Configurações.\n\nImportar: Restaure seu histórico enviando esse arquivo.",
    "Usamos a API de reconhecimento de voz do dispositivo. O processamento é local. Não gravamos áudio.",
    "Untwine não é um dispositivo médico. É uma ferramenta de autoajuda.\n\nCrise: Se estiver em perigo, não use este app. Ligue para a emergência ou acesse https://findahelpline.com/.",
    "Zero (0) scripts de rastreamento.\n\n• Sem Google Analytics.\n• Sem anúncios.",
    "Contato: contact@untwine.app"
  ),
  nl: createPrivacy(
    "Privacybeleid",
    "Uw mentale ruimte is privé. Geen cloud-database. Geen accounts vereist.\n\n\"Wat op uw telefoon gebeurt, blijft op uw telefoon.\"",
    "Untwine gebruikt lokale opslag. Alles wordt direct op het geheugen van uw apparaat opgeslagen. Geen gegevens verlaten uw apparaat.\n\nBelangrijke risico's:\n\n• Cache wissen wist uw geschiedenis.\n• Incognito-modus wist gegevens bij sluiten.\n• Verlies van telefoon betekent verlies van gegevens (zonder back-up).",
    "Geen cloudsynchronisatie.\n\nExporteren: Download een JSON-bestand via Instellingen.\n\nImporteren: Herstel uw geschiedenis door dat bestand te uploaden.",
    "We gebruiken de spraakherkennings-API van uw apparaat. Spraakgegevens worden lokaal verwerkt. We nemen geen audio op.",
    "Untwine is geen medisch hulpmiddel. Het is een zelfhulptool.\n\nCrisis: Gebruik deze app niet in nood. Bel de hulpdiensten of ga naar https://findahelpline.com/.",
    "We gebruiken nul (0) tracking-scripts.\n\n• Geen Google Analytics.\n• Geen advertenties.",
    "Contact: contact@untwine.app"
  ),
  sv: createPrivacy(
    "Integritetspolicy",
    "Ditt sinne är privat. Ingen molndatabas. Inga konton.\n\n\"Det som händer på din telefon, stannar på din telefon.\"",
    "Vi använder lokal lagring. Allt sparas på enhetens internminne. Ingen data lämnar din enhet.\n\nRisker:\n\n• Att rensa webbläsarens cache raderar historiken.\n• Inkognitoläge raderar data vid stängning.\n• Förlorad telefon innebär förlorad data (utan backup).",
    "Ingen molnsynkronisering.\n\nExportera: Ladda ner en JSON-fil från Inställningar.\n\nImportera: Återställ genom att ladda upp filen.",
    "Vi använder enhetens röst-API. Röstdata behandlas lokalt. Vi spelar inte in ljud.",
    "Untwine är inte en medicinteknisk produkt. Det är ett självhjälpsverktyg.\n\nKris: Använd inte denna app vid fara. Ring nödnummer eller besök https://findahelpline.com/.",
    "Noll (0) spårningsskript.\n\n• Inga Google Analytics.\n• Inga annonser.",
    "Kontakt: contact@untwine.app"
  ),
  pl: createPrivacy(
    "Polityka Prywatności",
    "Twój umysł jest prywatny. Brak bazy w chmurze. Brak kont.\n\n\"To, co dzieje się na telefonie, zostaje na telefonie.\"",
    "Używamy Pamięci Lokalnej. Wszystko jest zapisywane w pamięci urządzenia. Żadne dane nie opuszczają urządzenia.\n\nRyzyka:\n\n• Wyczyszczenie pamięci podręcznej usuwa historię.\n• Tryb Incognito usuwa dane po zamknięciu.\n• Utrata telefonu to utrata danych (bez kopii zapasowej).",
    "Brak synchronizacji z chmurą.\n\nEksport: Pobierz plik JSON z Ustawień.\n\nImport: Przywróć historię przesyłając ten plik.",
    "Używamy API rozpoznawania mowy urządzenia. Dane głosowe przetwarzane są lokalnie. Nie nagrywamy dźwięku.",
    "Untwine nie jest wyrobem medycznym. To narzędzie samopomocy.\n\nKryzys: W razie zagrożenia zadzwoń na pogotowie lub wejdź na https://findahelpline.com/.",
    "Zero (0) skryptów śledzących.\n\n• Brak Google Analytics.\n• Brak reklam.",
    "Kontakt: contact@untwine.app"
  ),
  el: createPrivacy(
    "Πολιτική Απορρήτου",
    "Το μυαλό σας είναι ιδιωτικό. Χωρίς βάση δεδομένων cloud. Χωρίς λογαριασμούς.\n\n\"Ό,τι συμβαίνει στο τηλέφωνό σας, μένει στο τηλέφωνό σας.\"",
    "Χρησιμοποιούμε Τοπική Αποθήκευση. Όλα αποθηκεύονται στη μνήμη της συσκευής. Κανένα δεδομένο δεν φεύγει από τη συσκευή.\n\nΚίνδυνοι:\n\n• Η εκκαθάριση της cache διαγράφει το ιστορικό.\n• Η ανώνυμη περιήγηση διαγράφει τα δεδομένα κατά το κλείσιμο.\n• Η απώλεια τηλεφώνου σημαίνει απώλεια δεδομένων (χωρίς backup).",
    "Δεν υπάρχει συγχρονισμός cloud.\n\nΕξαγωγή: Κατεβάστε ένα αρχείο JSON από τις Ρυθμίσεις.\n\nΕισαγωγή: Επαναφέρετε ανεβάζοντας αυτό το αρχείο.",
    "Χρησιμοποιούμε το API αναγνώρισης φωνής της συσκευής. Η επεξεργασία γίνεται τοπικά. Δεν καταγράφουμε ήχο.",
    "Το Untwine δεν είναι ιατρική συσκευή.\n\nΚρίση: Αν κινδυνεύετε, καλέστε βοήθεια ή επισκεφθείτε το https://findahelpline.com/.",
    "Μηδέν (0) σενάρια παρακολούθησης.\n\n• Όχι Google Analytics.\n• Όχι διαφημίσεις.",
    "Επικοινωνία: contact@untwine.app"
  ),
  tr: createPrivacy(
    "Gizlilik Politikası",
    "Zihniniz özeldir. Bulut veritabanı yok. Hesap yok.\n\n\"Telefonunuzda olan, telefonunuzda kalır.\"",
    "Yerel Depolama kullanıyoruz. Her şey cihazınızın hafızasına kaydedilir. Hiçbir veri cihazdan çıkmaz.\n\nÖnemli Riskler:\n\n• Önbelleği temizlemek geçmişi siler.\n• Gizli mod, kapatıldığında verileri siler.\n• Telefonu kaybetmek verileri kaybetmek demektir (yedekleme yoksa).",
    "Bulut senkronizasyonu yok.\n\nDışa Aktar: Ayarlar'dan bir JSON dosyası indirin.\n\nİçe Aktar: O dosyayı yükleyerek geri yükleyin.",
    "Cihazınızın Konuşma Tanıma API'sini kullanıyoruz. Ses verileri yerel olarak işlenir. Ses kaydetmiyoruz.",
    "Untwine tıbbi bir cihaz değildir. Kendi kendine yardım aracıdır.\n\nKriz: Tehlikedeyseniz acil servisleri arayın veya https://findahelpline.com/ adresini kullanın.",
    "Sıfır (0) izleme komut dosyası.\n\n• Google Analytics yok.\n• Reklam yok.",
    "İletişim: contact@untwine.app"
  ),
  ru: createPrivacy(
    "Политика конфиденциальности",
    "Ваше личное пространство неприкосновенно. Нет облачной базы данных. Нет аккаунтов.\n\n«Всё, что происходит в телефоне, остаётся в телефоне».",
    "Мы используем Локальное хранилище. Всё сохраняется во внутренней памяти устройства. Данные не покидают устройство.\n\nРиски:\n\n• Очистка кэша браузера удаляет историю.\n• Режим Инкогнито удаляет данные при закрытии.\n• Потеря телефона означает потерю данных (без бэкапа).",
    "Нет синхронизации с облаком.\n\nЭкспорт: Скачайте JSON-файл в Настройках.\n\nИмпорт: Восстановите историю, загрузив этот файл.",
    "Используем API распознавания речи устройства. Обработка локальная. Мы не записываем аудио.",
    "Untwine — не медицинское устройство. Это утилита для самопомощи.\n\nКризис: Если вы в опасности, звоните в экстренные службы или посетите https://findahelpline.com/.",
    "Ноль (0) трекеров.\n\n• Нет Google Analytics.\n• Нет рекламы.",
    "Контакты: contact@untwine.app"
  ),
  zh: createPrivacy(
    "隐私政策",
    "您的精神空间是私密的。无云端数据库。无需账户。\n\n“手机里发生的事，留在手机里。”",
    "Untwine 使用本地存储。所有内容直接保存在设备内存中。没有数据离开您的设备。\n\n重要风险：\n\n• 清除浏览器缓存会删除历史记录。\n• 无痕模式会在关闭时删除数据。\n• 如果丢失手机，数据也会丢失（除非手动备份）。",
    "无云端同步。\n\n导出：从设置下载 JSON 文件。\n\n导入：上传该文件以恢复历史记录。",
    "我们使用设备的内置语音识别 API。语音数据在本地处理。我们不录制音频。",
    "Untwine 不是医疗设备。它是自助工具。\n\n危机情况：如果您处于危险中，请致电急救服务或访问 https://findahelpline.com/。",
    "零 (0) 追踪器。\n\n• 无 Google Analytics。\n• 无广告。",
    "联系我们：contact@untwine.app"
  ),
  ja: createPrivacy(
    "プライバシーポリシー",
    "あなたの心はプライベートなものです。クラウドデータベースなし。アカウント不要。\n\n「スマホで起きたことは、スマホの中に。」",
    "Untwineはローカルストレージを使用します。すべて端末の内部メモリに保存されます。データが端末外に出ることはありません。\n\n重要なリスク：\n\n• キャッシュを消去すると履歴が消えます。\n• シークレットモードは閉じるとデータを消去します。\n• スマホを紛失するとデータも失われます（手動バックアップがない場合）。",
    "クラウド同期はありません。\n\nエクスポート：設定からJSONファイルをダウンロード。\n\nインポート：ファイルをアップロードして復元。",
    "端末の音声認識APIを使用します。音声データはローカルで処理されます。録音はしません。",
    "Untwineは医療機器ではありません。自助ツールです。\n\n危機的状況：危険を感じる場合は、救急サービスに連絡するか、https://findahelpline.com/ を利用してください。",
    "トラッカー ゼロ (0)。\n\n• Google Analyticsなし。\n• 広告なし。",
    "お問い合わせ：contact@untwine.app"
  ),
  ko: createPrivacy(
    "개인정보 처리방침",
    "당신의 마음은 사적인 것입니다. 클라우드 데이터베이스 없음. 계정 필요 없음.\n\n\"휴대전화에서 일어난 일은 휴대전화에 머무릅니다.\"",
    "Untwine은 로컬 저장소를 사용합니다. 모든 내용은 기기 내부에 저장됩니다. 데이터가 기기를 떠나지 않습니다.\n\n중요한 위험:\n\n• 브라우저 캐시를 지우면 기록이 삭제됩니다.\n• 시크릿 모드는 닫을 때 데이터를 삭제합니다.\n• 휴대전화를 분실하면 데이터도 손실됩니다 (수동 백업 없이).",
    "클라우드 동기화 없음.\n\n내보내기: 설정에서 JSON 파일을 다운로드하세요.\n\n가져오기: 파일을 업로드하여 복원하세요.",
    "기기의 음성 인식 API를 사용합니다. 데이터는 로컬에서 처리됩니다. 오디오를 녹음하지 않습니다.",
    "Untwine은 의료 기기가 아닙니다. 자가 도구입니다.\n\n위기 상황: 위험한 경우 응급 서비스에 전화하거나 https://findahelpline.com/을 이용하세요.",
    "추적 스크립트 0개.\n\n• Google Analytics 없음.\n• 광고 없음.",
    "문의: contact@untwine.app"
  ),
  vi: createPrivacy(
    "Chính sách bảo mật",
    "Tâm trí của bạn là riêng tư. Không có cơ sở dữ liệu đám mây. Không cần tài khoản.\n\n\"Những gì xảy ra trên điện thoại, ở lại trên điện thoại.\"",
    "Chúng tôi sử dụng Lưu trữ Cục bộ. Mọi thứ được lưu vào bộ nhớ thiết bị. Không dữ liệu nào rời khỏi thiết bị.\n\nRủi ro quan trọng:\n\n• Xóa bộ nhớ đệm sẽ xóa lịch sử.\n• Chế độ Ẩn danh xóa dữ liệu khi đóng.\n• Mất điện thoại đồng nghĩa mất dữ liệu (nếu không sao lưu).",
    "Không đồng bộ đám mây.\n\nXuất: Tải xuống tệp JSON từ Cài đặt.\n\nNhập: Tải lên tệp để khôi phục.",
    "Sử dụng API Nhận dạng Giọng nói của thiết bị. Dữ liệu xử lý cục bộ. Không ghi âm.",
    "Untwine không phải thiết bị y tế. Đây là công cụ tự giúp đỡ.\n\nKhẩn cấp: Nếu gặp nguy hiểm, gọi cấp cứu hoặc truy cập https://findahelpline.com/.",
    "Không (0) tập lệnh theo dõi.\n\n• Không Google Analytics.\n• Không quảng cáo.",
    "Liên hệ: contact@untwine.app"
  ),
  id: createPrivacy(
    "Kebijakan Privasi",
    "Pikiran Anda adalah privasi. Tanpa database cloud. Tidak perlu akun.\n\n\"Apa yang terjadi di ponsel Anda, tetap di ponsel Anda.\"",
    "Kami menggunakan Penyimpanan Lokal. Semuanya disimpan di memori perangkat. Tidak ada data yang keluar dari perangkat.\n\nRisiko Penting:\n\n• Menghapus cache akan menghapus riwayat.\n• Mode Penyamaran menghapus data saat ditutup.\n• Jika ponsel hilang, data hilang (tanpa cadangan manual).",
    "Tanpa sinkronisasi cloud.\n\nEkspor: Unduh file JSON dari Pengaturan.\n\nImpor: Pulihkan dengan mengunggah file tersebut.",
    "Menggunakan API Pengenalan Suara perangkat. Diproses secara lokal. Kami tidak merekam audio.",
    "Untwine bukan alat medis. Ini adalah utilitas swadaya.\n\nKrisis: Jika dalam bahaya, hubungi layanan darurat atau https://findahelpline.com/.",
    "Nol (0) pelacak.\n\n• Tidak ada Google Analytics.\n• Tidak ada Iklan.",
    "Hubungi kami: contact@untwine.app"
  ),
  th: createPrivacy(
    "นโยบายความเป็นส่วนตัว",
    "จิตใจของคุณเป็นเรื่องส่วนตัว ไม่มีฐานข้อมูลคลาวด์ ไม่ต้องมีบัญชี\n\n\"สิ่งที่เกิดขึ้นในโทรศัพท์ของคุณ จะอยู่แค่ในโทรศัพท์ของคุณ\"",
    "เราใช้ Local Storage ทุกอย่างจะถูกบันทึกลงในหน่วยความจำเครื่อง ข้อมูลจะไม่ถูกส่งออก\n\nความเสี่ยงสำคัญ:\n\n• การล้างแคชจะลบประวัติของคุณ\n• โหมดไม่ระบุตัวตนจะลบข้อมูลเมื่อปิด\n• หากโทรศัพท์หาย ข้อมูลจะหายไป (ถ้าไม่ได้สำรอง)",
    "ไม่มีการซิงค์คลาวด์\n\nส่งออก: ดาวน์โหลดไฟล์ JSON จากการตั้งค่า\n\nนำเข้า: กู้คืนโดยการอัปโหลดไฟล์นั้น",
    "ใช้ API การจดจำเสียงของอุปกรณ์ ประมวลผลในเครื่อง เราไม่บันทึกเสียง",
    "Untwine ไม่ใช่อุปกรณ์ทางการแพทย์ เป็นเครื่องมือช่วยเหลือตนเอง\n\nวิกฤต: หากมีอันตราย โทรแจ้งฉุกเฉินหรือใช้ https://findahelpline.com/",
    "ศูนย์ (0) ตัวติดตาม\n\n• ไม่มี Google Analytics\n• ไม่มีโฆษณา",
    "ติดต่อเรา: contact@untwine.app"
  ),
  ar: createPrivacy(
    "سياسة الخصوصية",
    "مساحتك الذهنية خاصة. لا قاعدة بيانات سحابية. لا حسابات.\n\n\"ما يحدث على هاتفك، يبقى على هاتفك.\"",
    "نستخدم التخزين المحلي. يتم حفظ كل شيء على ذاكرة جهازك. لا تغادر أي بيانات جهازك.\n\nمخاطر مهمة:\n\n• مسح الذاكرة المؤقتة يمسح السجل.\n• الوضع المتخفي يمسح البيانات عند الإغلاق.\n• فقدان الهاتف يعني فقدان البيانات (بدون نسخ احتياطي).",
    "لا توجد مزامنة سحابية.\n\nتصدير: قم بتنزيل ملف JSON من الإعدادات.\n\nاستيراد: استعد السجل برفع الملف.",
    "نستخدم واجهة التعرف على الصوت في جهازك. المعالجة محلية. لا نسجل الصوت.",
    "Untwine ليس جهازاً طبياً. إنه أداة مساعدة ذاتية.\n\nطوارئ: إذا كنت في خطر، اتصل بالإسعاف أو زر https://findahelpline.com/.",
    "صفر (0) نصوص تتبع.\n\n• لا Google Analytics.\n• لا إعلانات.",
    "اتصل بنا: contact@untwine.app"
  ),
  he: createPrivacy(
    "מדיניות פרטיות",
    "המרחב הנפשי שלך פרטי. אין מסד נתונים בענן. אין צורך בחשבון.\n\n\"מה שקורה בטלפון שלך, נשאר בטלפון שלך.\"",
    "אנו משתמשים באחסון מקומי. הכל נשמר בזיכרון המכשיר. שום מידע לא יוצא ממנו.\n\nסיכונים חשובים:\n\n• ניקוי מטמון מוחק את ההיסטוריה.\n• מצב אינקוגניטו מוחק נתונים בסגירה.\n• אובדן טלפון משמעו אובדן נתונים (ללא גיבוי ידני).",
    "אין סנכרון ענן.\n\nייצוא: הורד קובץ JSON מההגדרות.\n\nייבוא: שחזר על ידי העלאת הקובץ.",
    "אנו משתמשים ב-API לזיהוי דיבור של המכשיר. העיבוד הוא מקומי. איננו מקליטים אודיו.",
    "Untwine אינה מכשיר רפואי. זהו כלי לעזרה עצמית.\n\nחירום: אם אתה בסכנה, התקשר לשירותי חירום או השתמש ב-https://findahelpline.com/.",
    "אפס (0) מעקבים.\n\n• אין Google Analytics.\n• אין פרסומות.",
    "צור קשר: contact@untwine.app"
  ),
  hi: createPrivacy(
    "गोपनीयता नीति",
    "आपका मानसिक स्थान निजी है। कोई क्लाउड डेटाबेस नहीं। कोई खाता आवश्यक नहीं।\n\n\"जो आपके फोन पर होता है, वह आपके फोन पर रहता है।\"",
    "हम स्थानीय भंडारण का उपयोग करते हैं। सब कुछ सीधे आपके डिवाइस की मेमोरी में सहेजा जाता है। कोई डेटा बाहर नहीं जाता।\n\nमहत्वपूर्ण जोखिम:\n\n• कैश साफ़ करने से इतिहास मिट जाएगा।\n• गुप्त मोड बंद होने पर डेटा मिटा देता है।\n• फोन खोने पर डेटा खो जाता है (बिना बैकअप के)।",
    "कोई क्लाउड सिंक नहीं।\n\nनिर्यात: सेटिंग्स से JSON फ़ाइल डाउनलोड करें।\n\nआयात: फ़ाइल अपलोड करके पुनर्स्थापित करें।",
    "हम डिवाइस के वॉयस रिकग्निशन एपीआई का उपयोग करते हैं। प्रसंस्करण स्थानीय है। हम ऑडियो रिकॉर्ड नहीं करते हैं।",
    "Untwine एक चिकित्सा उपकरण नहीं है। यह एक स्वयं सहायता उपकरण है।\n\nसंकट: यदि खतरे में हैं, तो आपातकालीन सेवाओं को कॉल करें या https://findahelpline.com/ पर जाएं।",
    "शून्य (0) ट्रैकिंग।\n\n• कोई Google Analytics नहीं।\n• कोई विज्ञापन नहीं।",
    "संपर्क करें: contact@untwine.app"
  ),
  bn: createPrivacy(
    "গোপনীয়তা নীতি",
    "আপনার মানসিক স্থান ব্যক্তিগত। কোন ক্লাউড ডেটাবেস নেই। অ্যাকাউন্টের প্রয়োজন নেই।\n\n\"যা আপনার ফোনে ঘটে, তা আপনার ফোনেই থাকে।\"",
    "আমরা লোকাল স্টোরেজ ব্যবহার করি। সবকিছু সরাসরি ডিভাইসের মেমোরিতে সেভ হয়। কোন ডেটা ডিভাইস ছেড়ে যায় না।\n\nগুরুত্বপূর্ণ ঝুঁকি:\n\n• ক্যাশ পরিষ্কার করলে ইতিহাস মুছে যাবে।\n• ইনকগনিটো মোড বন্ধ করলে ডেটা মুছে যায়।\n• ফোন হারালে ডেটা হারিয়ে যাবে (ব্যাকআপ ছাড়া)।",
    "কোন ক্লাউড সিঙ্ক নেই।\n\nরপ্তানি: সেটিংস থেকে JSON ফাইল ডাউনলোড করুন।\n\nআমদানি: ফাইল আপলোড করে পুনরুদ্ধার করুন।",
    "আমরা ডিভাইসের ভয়েস রিকগনিশন API ব্যবহার করি। প্রক্রিয়াটি স্থানীয়। আমরা অডিও রেকর্ড করি না।",
    "Untwine কোন চিকিৎসা যন্ত্র নয়। এটি একটি স্ব-সহায়ক টুল।\n\nজরুরী: বিপদে থাকলে, জরুরী সেবায় কল করুন বা https://findahelpline.com/ দেখুন।",
    "শূন্য (0) ট্র্যাকিং।\n\n• কোন Google Analytics নেই।\n• কোন বিজ্ঞাপন নেই।",
    "যোগাযোগ: contact@untwine.app"
  ),
  fa: createPrivacy(
    "سیاست حفظ حریم خصوصی",
    "فضای ذهنی شما خصوصی است. بدون پایگاه داده ابری. بدون نیاز به حساب.\n\n\"آنچه در تلفن شما اتفاق می‌افتد، در تلفن شما می‌ماند.\"",
    "ما از ذخیره‌سازی محلی استفاده می‌کنیم. همه چیز در حافظه دستگاه ذخیره می‌شود. هیچ داده‌ای خارج نمی‌شود.\n\nخطرات مهم:\n\n• پاک کردن حافظه پنهان تاریخچه را پاک می‌کند.\n• حالت ناشناس هنگام بسته شدن داده‌ها را پاک می‌کند.\n• گم شدن تلفن یعنی از دست دادن داده‌ها (بدون پشتیبان).",
    "بدون همگام‌سازی ابری.\n\nصادرات: دانلود فایل JSON از تنظیمات.\n\nواردات: بازیابی با آپلود فایل.",
    "ما از API تشخیص گفتار دستگاه استفاده می‌کنیم. پردازش محلی است. ما صدا را ضبط نمی‌کنیم.",
    "Untwine یک دستگاه پزشکی نیست. ابزار خودیاری است.\n\nبحران: اگر در خطر هستید، با اورژانس تماس بگیرید یا از https://findahelpline.com/ استفاده کنید.",
    "صفر (0) ردیاب.\n\n• بدون Google Analytics.\n• بدون تبلیغات.",
    "تماس: contact@untwine.app"
  ),
  uk: createPrivacy(
    "Політика конфіденційності",
    "Ваш розум приватний. Немає хмарної бази. Обліковий запис не потрібен.\n\n\"Що відбувається на телефоні, залишається на телефоні.\"",
    "Ми використовуємо локальне сховище. Все зберігається в пам'яті пристрою. Дані не залишають пристрій.\n\nВажливі ризики:\n\n• Очищення кешу видаляє історію.\n• Режим інкогніто видаляє дані при закритті.\n• Втрата телефону означає втрату даних (без бекапу).",
    "Немає хмарної синхронізації.\n\nЕкспорт: Завантажте JSON-файл у Налаштуваннях.\n\nІмпорт: Відновіть історію, завантаживши файл.",
    "Ми використовуємо API розпізнавання мови пристрою. Обробка локальна. Ми не записуємо аудіо.",
    "Untwine не є медичним пристроєм. Це інструмент самодопомоги.\n\nКриза: Якщо ви в небезпеці, дзвоніть в екстрені служби або відвідайте https://findahelpline.com/.",
    "Нуль (0) трекерів.\n\n• Немає Google Analytics.\n• Немає реклами.",
    "Контакти: contact@untwine.app"
  ),
  tl: createPrivacy(
    "Patakaran sa Privacy",
    "Pribado ang iyong isip. Walang cloud database. Hindi kailangan ng account.\n\n\"Kung ano ang nasa telepono mo, mananatili sa telepono mo.\"",
    "Gumagamit kami ng Local Storage. Ang lahat ay naka-save sa memorya ng device. Walang data na lumalabas.\n\nMahahalagang Panganib:\n\n• Ang pag-clear ng cache ay magbubura ng history.\n• Ang Incognito mode ay nagbubura ng data kapag isinara.\n• Kung mawala ang telepono, mawawala ang data (maliban kung may backup).",
    "Walang cloud sync.\n\nExport: Mag-download ng JSON file mula sa Settings.\n\nImport: I-restore sa pamamagitan ng pag-upload ng file.",
    "Ginagamit namin ang Speech Recognition API ng device. Lokal ang pagproseso. Hindi kami nagre-record ng audio.",
    "Ang Untwine ay hindi medikal na device. Ito ay tool sa self-help.\n\nKrisis: Kung nasa panganib, tumawag sa emergency o gamitin ang https://findahelpline.com/.",
    "Zero (0) tracking scripts.\n\n• Walang Google Analytics.\n• Walang Ads.",
    "Makipag-ugnayan: contact@untwine.app"
  )
};

const LANGUAGES = {
  en: { label: 'English', dir: 'ltr', tagline: 'A sanctuary for your mind.', modes: { calm: 'Calm Me Now', stop: 'Stop Overthinking', decide: 'Help Me Decide', ground: 'Ground Me' }, overthinking: { step1: "You're imagining what could go wrong. That's human.", step2: "Let's give the other side the same attention.", step3_prompts: ["If this went well, what's the first sign?", "What's a realistic good outcome?"], step4_input: "Voice or Text.", step5: "You don't need to believe it will happen.\nJust remember it could.", btn_speak: "Tap to Speak", btn_listening: "Listening...", btn_clear: "Clear" }, grounding: { prompt: "Sensory Reset", steps: ["5 things you see", "4 things you feel", "3 things you hear", "2 things you smell", "1 thing you taste"], instruction: "Name them.", breathing: "Breathe with the circle." }, decision: { title: "Indecision Breaker", opt1: "Option A", opt2: "Option B", flip: "Flip Coin", result: "Coin Says:", gut: "If disappointed, pick the other.", reflip: "Again" }, calm: { inhale: "Inhale (4)", hold: "Hold (7)", exhale: "Exhale (8)" }, common: { next: "Next", done: "Done", good: "Good to go.", landing_btn: "Open Sanctuary", install_guide: "Install App", settings: "Settings", language: "Language", clear_data: "Clear Data", backup: "Backup", restore: "Restore", privacy: "Privacy Policy" } },
  es: { label: 'Español (Spanish)', dir: 'ltr', tagline: 'Un santuario para tu mente.', modes: { calm: 'Cálmame', stop: 'Detener Pensamientos', decide: 'Ayúdame a Decidir', ground: 'Conéctame' }, overthinking: { step1: "Estás imaginando lo peor. Es humano.", step2: "Miremos el lado bueno.", step3_prompts: ["Si saliera bien, ¿cuál sería la señal?", "¿Un resultado positivo realista?"], step4_input: "Voz o Texto.", step5: "No necesitas creerlo.\nSolo recuerda que es posible.", btn_speak: "Hablar", btn_listening: "Escuchando...", btn_clear: "Borrar" }, grounding: { prompt: "Reinicio", steps: ["5 cosas que ves", "4 cosas que sientes", "3 cosas que oyes", "2 cosas que hueles", "1 cosa que saboreas"], instruction: "Nómbralas.", breathing: "Respira." }, decision: { title: "Decisión", opt1: "Opción A", opt2: "Opción B", flip: "Lanzar", result: "La moneda dice:", gut: "Si estás decepcionado, cambia.", reflip: "De nuevo" }, calm: { inhale: "Inhala", hold: "Sostén", exhale: "Exhala" }, common: { next: "Siguiente", done: "Listo", good: "Listo.", landing_btn: "Abrir", install_guide: "Instalar", settings: "Ajustes", language: "Idioma", clear_data: "Borrar", backup: "Copiar", restore: "Restaurar", privacy: "Privacidad" } },
  fr: { label: 'Français (French)', dir: 'ltr', tagline: 'Un sanctuaire pour votre esprit.', modes: { calm: 'Apaise-moi', stop: 'Arrêter de trop penser', decide: 'Aidez-moi', ground: 'Ancrez-moi' }, overthinking: { step1: "Vous imaginez le pire...", step2: "Voyons le positif.", step3_prompts: ["Si ça se passait bien?"], step4_input: "Voix/Texte", step5: "Rappelez-vous que c'est possible.", btn_speak: "Parler", btn_listening: "Écoute...", btn_clear: "Effacer" }, grounding: { prompt: "Réinitialisation", steps: ["5 vues", "4 ressentis", "3 sons", "2 odeurs", "1 goût"], instruction: "Nommez-les.", breathing: "Respirez." }, decision: { title: "Décision", opt1: "A", opt2: "B", flip: "Lancer", result: "Résultat:", gut: "Si déçu, changez.", reflip: "Encore" }, calm: { inhale: "Inspirez", hold: "Retenez", exhale: "Expirez" }, common: { next: "Suivant", done: "Fini", good: "C'est bon.", landing_btn: "Ouvrir", install_guide: "Installer", settings: "Paramètres", language: "Langue", clear_data: "Effacer", backup: "Sauver", restore: "Restaurer", privacy: "Confidentialité" } },
  de: { label: 'Deutsch (German)', dir: 'ltr', tagline: 'Ein Zufluchtsort.', modes: { calm: 'Beruhige mich', stop: 'Kopfkino stoppen', decide: 'Entscheidung', ground: 'Erde mich' }, overthinking: { step1: "Du denkst das Schlimmste...", step2: "Schau auf das Gute.", step3_prompts: ["Wenn es gut läuft?"], step4_input: "Sprache/Text", step5: "Erinnere dich, es ist möglich.", btn_speak: "Sprechen", btn_listening: "Höre...", btn_clear: "Löschen" }, grounding: { prompt: "Reset", steps: ["5 sehen", "4 fühlen", "3 hören", "2 riechen", "1 schmecken"], instruction: "Benenne sie.", breathing: "Atme." }, decision: { title: "Entscheidung", opt1: "A", opt2: "B", flip: "Werfen", result: "Münze:", gut: "Wenn enttäuscht, wechsel.", reflip: "Nochmal" }, calm: { inhale: "Ein", hold: "Halten", exhale: "Aus" }, common: { next: "Weiter", done: "Fertig", good: "Gut.", landing_btn: "Öffnen", install_guide: "Installieren", settings: "Einstellungen", language: "Sprache", clear_data: "Löschen", backup: "Sichern", restore: "Laden", privacy: "Datenschutz" } },
  it: { label: 'Italiano (Italian)', dir: 'ltr', tagline: 'Un santuario.', modes: { calm: 'Calmami', stop: 'Ferma Pensieri', decide: 'Decidi', ground: 'Radicami' }, overthinking: { step1: "Immagini il peggio...", step2: "Guarda il meglio.", step3_prompts: ["Se andasse bene?"], step4_input: "Voce/Testo", step5: "Ricorda che è possibile.", btn_speak: "Parla", btn_listening: "Ascolto...", btn_clear: "Cancella" }, grounding: { prompt: "Reset", steps: ["5 vedi", "4 senti", "3 udi", "2 odori", "1 gusti"], instruction: "Nominali.", breathing: "Respira." }, decision: { title: "Decisione", opt1: "A", opt2: "B", flip: "Lancia", result: "Esito:", gut: "Se deluso, cambia.", reflip: "Ancora" }, calm: { inhale: "Inspira", hold: "Tieni", exhale: "Espira" }, common: { next: "Avanti", done: "Fatto", good: "Bene.", landing_btn: "Apri", install_guide: "Installa", settings: "Impostazioni", language: "Lingua", clear_data: "Cancella", backup: "Backup", restore: "Ripristina", privacy: "Privacy" } },
  pt: { label: 'Português (Portuguese)', dir: 'ltr', tagline: 'Um santuário.', modes: { calm: 'Acalme-me', stop: 'Parar Pensar', decide: 'Decidir', ground: 'Aterrar' }, overthinking: { step1: "Imaginando o pior...", step2: "Olhe o lado bom.", step3_prompts: ["E se der certo?"], step4_input: "Voz/Texto", step5: "Lembre que pode acontecer.", btn_speak: "Falar", btn_listening: "Ouvindo...", btn_clear: "Limpar" }, grounding: { prompt: "Reset", steps: ["5 ver", "4 sentir", "3 ouvir", "2 cheirar", "1 provar"], instruction: "Nomeie.", breathing: "Respire." }, decision: { title: "Decisão", opt1: "A", opt2: "B", flip: "Jogar", result: "Moeda:", gut: "Se triste, troque.", reflip: "De novo" }, calm: { inhale: "Inspire", hold: "Segure", exhale: "Expire" }, common: { next: "Próximo", done: "Pronto", good: "Bem.", landing_btn: "Abrir", install_guide: "Instalar", settings: "Config", language: "Idioma", clear_data: "Limpar", backup: "Backup", restore: "Restaurar", privacy: "Privacidade" } },
  nl: { label: 'Nederlands (Dutch)', dir: 'ltr', tagline: 'Een toevluchtsoord.', modes: { calm: 'Kalmeer', stop: 'Stop Piekeren', decide: 'Beslis', ground: 'Aard' }, overthinking: { step1: "Je denkt het ergste...", step2: "Kijk naar het goede.", step3_prompts: ["Als het goed gaat?"], step4_input: "Stem/Tekst", step5: "Onthoud dat het kan.", btn_speak: "Spreek", btn_listening: "Luisteren...", btn_clear: "Wis" }, grounding: { prompt: "Reset", steps: ["5 zien", "4 voelen", "3 horen", "2 ruiken", "1 proeven"], instruction: "Benoem.", breathing: "Adem." }, decision: { title: "Besluit", opt1: "A", opt2: "B", flip: "Gooi", result: "Munt:", gut: "Indien teleurgesteld, wissel.", reflip: "Opnieuw" }, calm: { inhale: "In", hold: "Vast", exhale: "Uit" }, common: { next: "Verder", done: "Klaar", good: "Goed.", landing_btn: "Open", install_guide: "Installeer", settings: "Instelling", language: "Taal", clear_data: "Wis", backup: "Backup", restore: "Herstel", privacy: "Privacy" } },
  sv: { label: 'Svenska (Swedish)', dir: 'ltr', tagline: 'En fristad.', modes: { calm: 'Lugna mig', stop: 'Sluta Övertänka', decide: 'Besluta', ground: 'Jorda' }, overthinking: { step1: "Du tänker det värsta...", step2: "Se det goda.", step3_prompts: ["Om det går bra?"], step4_input: "Röst/Text", step5: "Kom ihåg att det kan.", btn_speak: "Tala", btn_listening: "Lyssnar...", btn_clear: "Rensa" }, grounding: { prompt: "Reset", steps: ["5 se", "4 känn", "3 hör", "2 lukta", "1 smaka"], instruction: "Nämn dem.", breathing: "Andas." }, decision: { title: "Beslut", opt1: "A", opt2: "B", flip: "Singla", result: "Mynt:", gut: "Om besviken, byt.", reflip: "Igen" }, calm: { inhale: "In", hold: "Håll", exhale: "Ut" }, common: { next: "Nästa", done: "Klart", good: "Bra.", landing_btn: "Öppna", install_guide: "Installera", settings: "Inställningar", language: "Språk", clear_data: "Rensa", backup: "Backup", restore: "Återställ", privacy: "Integritet" } },
  pl: { label: 'Polski (Polish)', dir: 'ltr', tagline: 'Sanktuarium.', modes: { calm: 'Uspokój', stop: 'Zatrzymaj Myśli', decide: 'Decyzja', ground: 'Uziemienie' }, overthinking: { step1: "Myślisz o najgorszym...", step2: "Spójrz na dobre.", step3_prompts: ["Jeśli się uda?"], step4_input: "Głos/Tekst", step5: "Pamiętaj, że to możliwe.", btn_speak: "Mów", btn_listening: "Słucham...", btn_clear: "Wyczyść" }, grounding: { prompt: "Reset", steps: ["5 widzisz", "4 czujesz", "3 słyszysz", "2 wąchasz", "1 smakujesz"], instruction: "Nazwij.", breathing: "Oddychaj." }, decision: { title: "Decyzja", opt1: "A", opt2: "B", flip: "Rzuć", result: "Moneta:", gut: "Jeśli żałujesz, zmień.", reflip: "Znów" }, calm: { inhale: "Wdech", hold: "Trzymaj", exhale: "Wydech" }, common: { next: "Dalej", done: "Gotowe", good: "Ok.", landing_btn: "Otwórz", install_guide: "Instaluj", settings: "Ustawienia", language: "Język", clear_data: "Wyczyść", backup: "Kopia", restore: "Przywróć", privacy: "Prywatność" } },
  el: { label: 'Ελληνικά (Greek)', dir: 'ltr', tagline: 'Καταφύγιο.', modes: { calm: 'Ηρέμησε', stop: 'Σταμάτα Σκέψη', decide: 'Απόφαση', ground: 'Γείωση' }, overthinking: { step1: "Φαντάζεσαι το χειρότερο...", step2: "Δες το καλό.", step3_prompts: ["Αν πάει καλά;"], step4_input: "Φωνή/Κείμενο", step5: "Θυμήσου ότι μπορεί.", btn_speak: "Μίλα", btn_listening: "Ακούω...", btn_clear: "Καθαρισμός" }, grounding: { prompt: "Επαναφορά", steps: ["5 βλέπεις", "4 νιώθεις", "3 ακούς", "2 μυρίζεις", "1 γεύεσαι"], instruction: "Πες τα.", breathing: "Ανάπνευσε." }, decision: { title: "Απόφαση", opt1: "Α", opt2: "Β", flip: "Ρίξε", result: "Νόμισμα:", gut: "Αν απογοητεύτηκες, άλλαξε.", reflip: "Ξανά" }, calm: { inhale: "Εισπνοή", hold: "Κράτα", exhale: "Εκπνοή" }, common: { next: "Επόμενο", done: "Τέλος", good: "Εντάξει.", landing_btn: "Άνοιγμα", install_guide: "Εγκατάσταση", settings: "Ρυθμίσεις", language: "Γλώσσα", clear_data: "Διαγραφή", backup: "Αντίγραφο", restore: "Επαναφορά", privacy: "Απόρρητο" } },
  tr: { label: 'Türkçe (Turkish)', dir: 'ltr', tagline: 'Sığınak.', modes: { calm: 'Sakinleş', stop: 'Düşünme', decide: 'Karar', ground: 'Topraklan' }, overthinking: { step1: "En kötüyü düşünüyorsun...", step2: "İyiye bak.", step3_prompts: ["Ya iyi giderse?"], step4_input: "Ses/Metin", step5: "Mümkün olduğunu hatırla.", btn_speak: "Konuş", btn_listening: "Dinliyor...", btn_clear: "Temizle" }, grounding: { prompt: "Sıfırla", steps: ["5 gör", "4 hisset", "3 duy", "2 kokla", "1 tat"], instruction: "Söyle.", breathing: "Nefes al." }, decision: { title: "Karar", opt1: "A", opt2: "B", flip: "At", result: "Para:", gut: "Üzgünsen değiştir.", reflip: "Tekrar" }, calm: { inhale: "Al", hold: "Tut", exhale: "Ver" }, common: { next: "İleri", done: "Bitti", good: "Tamam.", landing_btn: "Aç", install_guide: "Yükle", settings: "Ayarlar", language: "Dil", clear_data: "Temizle", backup: "Yedekle", restore: "Yükle", privacy: "Gizlilik" } },
  ru: { label: 'Русский (Russian)', dir: 'ltr', tagline: 'Убежище.', modes: { calm: 'Успокойся', stop: 'Стоп Мысли', decide: 'Решение', ground: 'Заземление' }, overthinking: { step1: "Думаешь о плохом...", step2: "Подумай о хорошем.", step3_prompts: ["Если все получится?"], step4_input: "Голос/Текст", step5: "Помни, это возможно.", btn_speak: "Говорить", btn_listening: "Слушаю...", btn_clear: "Стереть" }, grounding: { prompt: "Сброс", steps: ["5 видишь", "4 чувствуешь", "3 слышишь", "2 чуешь", "1 вкус"], instruction: "Назови.", breathing: "Дыши." }, decision: { title: "Решение", opt1: "А", opt2: "Б", flip: "Бросить", result: "Монета:", gut: "Если жаль, меняй.", reflip: "Снова" }, calm: { inhale: "Вдох", hold: "Держи", exhale: "Выдох" }, common: { next: "Далее", done: "Готово", good: "Ок.", landing_btn: "Открыть", install_guide: "Установить", settings: "Настройки", language: "Язык", clear_data: "Стереть", backup: "Бэкап", restore: "Восст.", privacy: "Приватность" } },
  zh: { label: '中文 (Chinese)', dir: 'ltr', tagline: '避风港。', modes: { calm: '冷静', stop: '停止思考', decide: '决定', ground: '落地' }, overthinking: { step1: "你在想最坏的情况...", step2: "看看好的方面。", step3_prompts: ["如果顺利呢？"], step4_input: "语音/文字", step5: "记住这是可能的。", btn_speak: "说", btn_listening: "听...", btn_clear: "清除" }, grounding: { prompt: "重置", steps: ["5看", "4感", "3听", "2闻", "1尝"], instruction: "命名。", breathing: "呼吸。" }, decision: { title: "决定", opt1: "A", opt2: "B", flip: "抛", result: "结果:", gut: "失望就换。", reflip: "重抛" }, calm: { inhale: "吸", hold: "屏", exhale: "呼" }, common: { next: "下", done: "完", good: "好。", landing_btn: "打开", install_guide: "安装", settings: "设置", language: "语言", clear_data: "清除", backup: "备份", restore: "恢复", privacy: "隐私" } },
  ja: { label: '日本語 (Japanese)', dir: 'ltr', tagline: '聖域。', modes: { calm: '冷静', stop: '思考停止', decide: '決断', ground: '接地' }, overthinking: { step1: "最悪を想像しています...", step2: "良い面を見よう。", step3_prompts: ["うまくいったら？"], step4_input: "声/文字", step5: "可能性を覚えておいて。", btn_speak: "話す", btn_listening: "聞いています...", btn_clear: "消去" }, grounding: { prompt: "リセット", steps: ["5視", "4触", "3聴", "2嗅", "1味"], instruction: "名前を。", breathing: "呼吸。" }, decision: { title: "決断", opt1: "A", opt2: "B", flip: "投げる", result: "結果:", gut: "失望なら変えて。", reflip: "再度" }, calm: { inhale: "吸", hold: "止", exhale: "吐" }, common: { next: "次", done: "完", good: "良し。", landing_btn: "開く", install_guide: "設置", settings: "設定", language: "言語", clear_data: "消去", backup: "保存", restore: "復元", privacy: "プライバシー" } },
  ko: { label: '한국어 (Korean)', dir: 'ltr', tagline: '안식처.', modes: { calm: '진정', stop: '생각 중지', decide: '결정', ground: '그라운딩' }, overthinking: { step1: "최악을 상상하네요...", step2: "좋은 쪽을 봐요.", step3_prompts: ["잘 된다면?"], step4_input: "음성/텍스트", step5: "가능성을 기억해요.", btn_speak: "말하기", btn_listening: "듣는 중...", btn_clear: "지우기" }, grounding: { prompt: "리셋", steps: ["5 봄", "4 느낌", "3 들림", "2 냄새", "1 맛"], instruction: "말해요.", breathing: "호흡." }, decision: { title: "결정", opt1: "A", opt2: "B", flip: "던지기", result: "결과:", gut: "실망하면 바꿔요.", reflip: "다시" }, calm: { inhale: "들이마심", hold: "멈춤", exhale: "내뱉음" }, common: { next: "다음", done: "완료", good: "좋아요.", landing_btn: "열기", install_guide: "설치", settings: "설정", language: "언어", clear_data: "삭제", backup: "백업", restore: "복원", privacy: "개인정보" } },
  vi: { label: 'Tiếng Việt (Vietnamese)', dir: 'ltr', tagline: 'Nơi trú ẩn.', modes: { calm: 'Bình tĩnh', stop: 'Dừng suy nghĩ', decide: 'Quyết định', ground: 'Định tâm' }, overthinking: { step1: "Bạn đang nghĩ điều tệ nhất...", step2: "Nhìn vào mặt tốt.", step3_prompts: ["Nếu tốt đẹp thì sao?"], step4_input: "Nói/Viết", step5: "Nhớ rằng có thể.", btn_speak: "Nói", btn_listening: "Nghe...", btn_clear: "Xóa" }, grounding: { prompt: "Đặt lại", steps: ["5 thấy", "4 cảm", "3 nghe", "2 ngửi", "1 nếm"], instruction: "Gọi tên.", breathing: "Thở." }, decision: { title: "Quyết định", opt1: "A", opt2: "B", flip: "Tung", result: "Kết quả:", gut: "Nếu thất vọng, đổi.", reflip: "Lại" }, calm: { inhale: "Hít", hold: "Giữ", exhale: "Thở" }, common: { next: "Tiếp", done: "Xong", good: "Tốt.", landing_btn: "Mở", install_guide: "Cài đặt", settings: "Cài đặt", language: "Ngôn ngữ", clear_data: "Xóa", backup: "Sao lưu", restore: "Khôi phục", privacy: "Riêng tư" } },
  id: { label: 'Bahasa Indonesia', dir: 'ltr', tagline: 'Tempat berlindung.', modes: { calm: 'Tenang', stop: 'Stop Berpikir', decide: 'Putuskan', ground: 'Bumikan' }, overthinking: { step1: "Anda membayangkan hal buruk...", step2: "Lihat sisi baiknya.", step3_prompts: ["Jika berhasil?"], step4_input: "Suara/Teks", step5: "Ingat itu mungkin.", btn_speak: "Bicara", btn_listening: "Mendengar...", btn_clear: "Hapus" }, grounding: { prompt: "Reset", steps: ["5 lihat", "4 rasa", "3 dengar", "2 cium", "1 kecap"], instruction: "Sebutkan.", breathing: "Bernapas." }, decision: { title: "Keputusan", opt1: "A", opt2: "B", flip: "Lempar", result: "Hasil:", gut: "Jika kecewa, ganti.", reflip: "Lagi" }, calm: { inhale: "Tarik", hold: "Tahan", exhale: "Hembus" }, common: { next: "Lanjut", done: "Selesai", good: "Siap.", landing_btn: "Buka", install_guide: "Instal", settings: "Pengaturan", language: "Bahasa", clear_data: "Hapus", backup: "Cadangkan", restore: "Pulihkan", privacy: "Privasi" } },
  th: { label: 'ไทย (Thai)', dir: 'ltr', tagline: 'ที่หลบภัย', modes: { calm: 'สงบ', stop: 'หยุดคิด', decide: 'ตัดสินใจ', ground: 'ดึงสติ' }, overthinking: { step1: "คุณคิดแง่ลบ...", step2: "มองแง่ดีบ้าง", step3_prompts: ["ถ้ามันดีล่ะ?"], step4_input: "เสียง/ข้อความ", step5: "จำไว้ว่าเป็นไปได้", btn_speak: "พูด", btn_listening: "ฟัง...", btn_clear: "ล้าง" }, grounding: { prompt: "รีเซ็ต", steps: ["5 เห็น", "4 รู้สึก", "3 ได้ยิน", "2 ได้กลิ่น", "1 รส"], instruction: "พูดออกมา", breathing: "หายใจ" }, decision: { title: "ตัดสินใจ", opt1: "A", opt2: "B", flip: "โยน", result: "ผล:", gut: "ถ้าผิดหวัง เปลี่ยน", reflip: "อีกครั้ง" }, calm: { inhale: "เข้า", hold: "กลั้น", exhale: "ออก" }, common: { next: "ถัดไป", done: "เสร็จ", good: "ดี", landing_btn: "เปิด", install_guide: "ติดตั้ง", settings: "ตั้งค่า", language: "ภาษา", clear_data: "ล้าง", backup: "สำรอง", restore: "กู้คืน", privacy: "ส่วนตัว" } },
  ar: { label: 'العربية (Arabic)', dir: 'rtl', tagline: 'ملاذ.', modes: { calm: 'هدئني', stop: 'وقف التفكير', decide: 'قرر', ground: 'ثبت' }, overthinking: { step1: "تتخيل الأسوأ...", step2: "انظر للإيجابية.", step3_prompts: ["ماذا لو نجح؟"], step4_input: "صوت/نص", step5: "تذكر أنه ممكن.", btn_speak: "تحدث", btn_listening: "استماع...", btn_clear: "مسح" }, grounding: { prompt: "ضبط", steps: ["5 ترى", "4 تشعر", "3 تسمع", "2 تشم", "1 تذوق"], instruction: "سمها.", breathing: "تنفس." }, decision: { title: "قرار", opt1: "أ", opt2: "ب", flip: "رمي", result: "النتيجة:", gut: "إذا خبت، غير.", reflip: "مجدداً" }, calm: { inhale: "شهيق", hold: "إمساك", exhale: "زفير" }, common: { next: "التالي", done: "تم", good: "جيد.", landing_btn: "فتح", install_guide: "تثبيت", settings: "إعدادات", language: "لغة", clear_data: "مسح", backup: "نسخ", restore: "استعادة", privacy: "خصوصية" } },
  he: { label: 'עברית (Hebrew)', dir: 'rtl', tagline: 'מקלט.', modes: { calm: 'רגע', stop: 'הפסק לחשוב', decide: 'החלט', ground: 'קרקע' }, overthinking: { step1: "אתה מדמיין את הגרוע...", step2: "הבט על הטוב.", step3_prompts: ["אם זה יצליח?"], step4_input: "קול/טקסט", step5: "זכור שזה אפשרי.", btn_speak: "דבר", btn_listening: "מקשיב...", btn_clear: "נקה" }, grounding: { prompt: "איפוס", steps: ["5 רואה", "4 מרגיש", "3 שומע", "2 מריח", "1 טועם"], instruction: "ציין.", breathing: "נשום." }, decision: { title: "החלטה", opt1: "א", opt2: "ב", flip: "הטל", result: "תוצאה:", gut: "אם מאוכזב, החלף.", reflip: "שוב" }, calm: { inhale: "שאוף", hold: "החזק", exhale: "נשוף" }, common: { next: "הבא", done: "סיום", good: "מוכן.", landing_btn: "פתח", install_guide: "התקן", settings: "הגדרות", language: "שפה", clear_data: "נקה", backup: "גיבוי", restore: "שחזור", privacy: "פרטיות" } },
  hi: { label: 'हिन्दी (Hindi)', dir: 'ltr', tagline: 'आश्रय', modes: { calm: 'शांत', stop: 'सोचना बंद', decide: 'निर्णय', ground: 'स्थिर' }, overthinking: { step1: "आप बुरा सोच रहे हैं...", step2: "अच्छा देखें।", step3_prompts: ["अगर अच्छा हुआ?"], step4_input: "आवाज़/टेक्स्ट", step5: "संभव है।", btn_speak: "बोलें", btn_listening: "सुन रहा हूँ...", btn_clear: "साफ़" }, grounding: { prompt: "रीसेट", steps: ["5 देखें", "4 महसूस", "3 सुनें", "2 सूंघें", "1 चखें"], instruction: "नाम लें।", breathing: "सांस लें।" }, decision: { title: "निर्णय", opt1: "A", opt2: "B", flip: "उछालें", result: "सिक्का:", gut: "निराश हैं तो बदलें।", reflip: "फिर से" }, calm: { inhale: "सांस लें", hold: "रोकें", exhale: "छोड़ें" }, common: { next: "अगला", done: "हो गया", good: "तैयार।", landing_btn: "खोलें", install_guide: "इंस्टॉल", settings: "सेटिंग्स", language: "भाषा", clear_data: "साफ़", backup: "बैकअप", restore: "बहाल", privacy: "गोपनीयता" } },
  bn: { label: 'বাংলা (Bengali)', dir: 'ltr', tagline: 'আশ্রয়', modes: { calm: 'शांत', stop: 'চিন্তা বন্ধ', decide: 'সিদ্ধান্ত', ground: 'স্থির' }, overthinking: { step1: "খারাপ ভাবছেন...", step2: "ভালো দেখুন।", step3_prompts: ["যদি ভালো হয়?"], step4_input: "ভয়েস/টেক্সট", step5: "মনে রাখুন সম্ভব।", btn_speak: "বলুন", btn_listening: "শুনছি...", btn_clear: "মুছুন" }, grounding: { prompt: "রিসেট", steps: ["৫ দেখা", "৪ অনুভব", "৩ শোনা", "২ গন্ধ", "১ স্বাদ"], instruction: "বলুন।", breathing: "শ্বাস।" }, decision: { title: "সিদ্ধান্ত", opt1: "ক", opt2: "খ", flip: "টস", result: "ফলাফল:", gut: "হতাশ হলে বদলান।", reflip: "আবার" }, calm: { inhale: "নিন", hold: "ধরে", exhale: "ছাড়ুন" }, common: { next: "পরবর্তী", done: "শেষ", good: "প্রস্তুত।", landing_btn: "খুলুন", install_guide: "ইনস্টল", settings: "সেটিংস", language: "ভাষা", clear_data: "মুছুন", backup: "ব্যাকআপ", restore: "ফেরত", privacy: "গোপনীয়তা" } },
  fa: { label: 'فارسی (Persian)', dir: 'rtl', tagline: 'پناهگاه.', modes: { calm: 'آرام', stop: 'توقف فکر', decide: 'تصمیم', ground: 'ثبت' }, overthinking: { step1: "بدترین را تصور می‌کنی...", step2: "به خوب نگاه کن.", step3_prompts: ["اگر خوب پیش برود؟"], step4_input: "صدا/متن", step5: "یادت باشد ممکن است.", btn_speak: "صحبت", btn_listening: "گوش...", btn_clear: "پاک" }, grounding: { prompt: "بازنشانی", steps: ["5 دیدن", "4 حس", "3 شنیدن", "2 بو", "1 چشیدن"], instruction: "نام ببر.", breathing: "نفس." }, decision: { title: "تصمیم", opt1: "الف", opt2: "ب", flip: "پرتاب", result: "سکه:", gut: "اگر ناراحتی عوض کن.", reflip: "مجدد" }, calm: { inhale: "دم", hold: "نگه", exhale: "بازدم" }, common: { next: "بعدی", done: "تمام", good: "خوب.", landing_btn: "باز", install_guide: "نصب", settings: "تنظیمات", language: "زبان", clear_data: "پاک", backup: "پشتیبان", restore: "بازیابی", privacy: "حریم خصوصی" } },
  uk: { label: 'Українська (Ukrainian)', dir: 'ltr', tagline: 'Притулок.', modes: { calm: 'Спокій', stop: 'Стоп думки', decide: 'Рішення', ground: 'Земля' }, overthinking: { step1: "Уявляєш найгірше...", step2: "Поглянь на добре.", step3_prompts: ["Якщо все вдасться?"], step4_input: "Голос/Текст", step5: "Це можливо.", btn_speak: "Кажи", btn_listening: "Слухаю...", btn_clear: "Очистити" }, grounding: { prompt: "Скидання", steps: ["5 бачиш", "4 відчуваєш", "3 чуєш", "2 нюхаєш", "1 смакуєш"], instruction: "Назви.", breathing: "Дихай." }, decision: { title: "Рішення", opt1: "А", opt2: "Б", flip: "Кинути", result: "Монета:", gut: "Розчарований - зміни.", reflip: "Знову" }, calm: { inhale: "Вдих", hold: "Тримай", exhale: "Видих" }, common: { next: "Далі", done: "Все", good: "Готово.", landing_btn: "Відкрити", install_guide: "Встановити", settings: "Налаштування", language: "Мова", clear_data: "Стерти", backup: "Бекап", restore: "Відновити", privacy: "Приватність" } },
  tl: { label: 'Tagalog (Filipino)', dir: 'ltr', tagline: 'Santuwaryo.', modes: { calm: 'Kalma', stop: 'Tigil Isip', decide: 'Pasya', ground: 'Lupa' }, overthinking: { step1: "Iniisip ang masama...", step2: "Tignan ang mabuti.", step3_prompts: ["Kung maging maayos?"], step4_input: "Boses/Teksto", step5: "Tandaan na pwede.", btn_speak: "Salita", btn_listening: "Nakikinig...", btn_clear: "Burahin" }, grounding: { prompt: "Reset", steps: ["5 kita", "4 dama", "3 rinig", "2 amoy", "1 lasa"], instruction: "Pangalanan.", breathing: "Hinga." }, decision: { title: "Desisyon", opt1: "A", opt2: "B", flip: "Hagis", result: "Barya:", gut: "Kung ayaw, palitan.", reflip: "Ulit" }, calm: { inhale: "Pasok", hold: "Pigil", exhale: "Labas" }, common: { next: "Sunod", done: "Tapos", good: "Ok na.", landing_btn: "Buksan", install_guide: "Install", settings: "Setting", language: "Wika", clear_data: "Bura", backup: "Backup", restore: "Restore", privacy: "Privacy" } }
};

const getSpeechLocale = (lang) => {
  const map = { 
    en: 'en-US', es: 'es-ES', fr: 'fr-FR', de: 'de-DE', 
    it: 'it-IT', pt: 'pt-BR', nl: 'nl-NL', sv: 'sv-SE',
    pl: 'pl-PL', el: 'el-GR', tr: 'tr-TR', ru: 'ru-RU',
    zh: 'zh-CN', ja: 'ja-JP', ko: 'ko-KR', vi: 'vi-VN',
    id: 'id-ID', th: 'th-TH', ar: 'ar-SA', he: 'he-IL',
    hi: 'hi-IN', bn: 'bn-IN', fa: 'fa-IR', uk: 'uk-UA',
    tl: 'fil-PH'
  };
  return map[lang] || 'en-US';
};

const getT = (lang, path) => {
  const keys = path.split('.');
  let current = LANGUAGES[lang] || LANGUAGES['en'];
  let fallback = LANGUAGES['en'];
  for (const key of keys) {
    current = current?.[key];
    fallback = fallback?.[key];
  }
  return current || fallback;
};

// --- Helper Components ---

const Button = ({ children, onClick, variant = 'primary', className = '', icon: Icon, dir = 'ltr', disabled = false }) => {
  const baseStyle = "w-full py-4 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-95 touch-manipulation font-medium text-lg tracking-wide disabled:opacity-50 disabled:pointer-events-none select-none";
  
  const variants = {
    primary: `bg-[#9FAF95] text-[#2F3A32] hover:bg-[#B4C2A7] shadow-lg`,
    secondary: `bg-[#3A453D] text-[#E6E8E2] border border-[#6F7A6A]/30`,
    ghost: `bg-transparent text-[#9FAF95] hover:bg-[#3A453D]/50`,
    outline: `border-2 border-[#9FAF95] text-[#9FAF95]`,
    dark: `bg-[#2F3A32] text-[#E6E8E2] hover:bg-[#3A453D]`, 
    light: `bg-[#E6E8E2] text-[#2F3A32] border border-[#2F3A32]/20 hover:bg-white`, 
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {Icon && (
        <span className={dir === 'rtl' ? 'ml-3' : 'mr-3'}>
          <Icon className="w-5 h-5 flex-shrink-0" />
        </span>
      )}
      <span className="truncate">{children}</span>
    </button>
  );
};

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <div 
    className={`animate-fade-in ${className}`}
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
  >
    {children}
  </div>
);

const AppFooter = ({ mode = 'light' }) => {
  const isDark = mode === 'dark';

  if (isDark) {
    return (
      <footer className="py-8 px-6 text-center pb-safe">
         <p className="text-xs text-white leading-relaxed font-light opacity-90">
           Untwine is not therapy and is not a substitute for professional mental health care. If you are in crisis, please contact a mental health professional or crisis helpline. <br/>
           <a href="https://findahelpline.com/" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-[#9FAF95] transition-colors mt-1 inline-block">https://findahelpline.com/</a>
         </p>
      </footer>
    );
  }

  return (
    <footer className="py-16 px-6 bg-[#F3F2EE] border-t border-[#2F3A32]/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
         <div className="flex items-center space-x-3 opacity-80">
            <img src="image1-removebg-preview.png" alt="Untwine Logo" className="w-8 h-8 object-contain" />
            <span className="text-[#2F3A32] font-medium tracking-tight">Untwine — A digital sanctuary</span>
         </div>
         <div className="flex space-x-8 text-sm text-[#6F7A6A]">
            <span>No tracking</span>
            <span>•</span>
            <span>No ads</span>
            <span>•</span>
            <span>100% free</span>
         </div>
      </div>
      <div className="border-t border-[#2F3A32]/5 pt-8 text-center">
         <p className="text-xs text-[#6F7A6A]/60 max-w-2xl mx-auto leading-relaxed">
           Untwine is not therapy and is not a substitute for professional mental health care. If you are in crisis, please contact a mental health professional or crisis helpline.
         </p>
      </div>
    </footer>
  );
};

// --- Website / Landing Page Component ---

const WebsiteLanding = ({ onEnter }) => {
  const scrollToInstall = () => {
    document.getElementById('install-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#F3F2EE] text-[#2F3A32] font-sans selection:bg-[#9FAF95] selection:text-[#2F3A32] overflow-x-hidden">
      <nav className="sticky top-0 z-50 bg-[#F3F2EE]/90 backdrop-blur-md border-b border-[#2F3A32]/5 px-4 md:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src="image1-removebg-preview.png" alt="Untwine" className="w-10 h-10 object-contain" />
          <span className="text-xl font-medium tracking-tight">Untwine</span>
        </div>
        <button onClick={onEnter} className="bg-[#2F3A32] text-[#E6E8E2] px-6 py-2 rounded-full text-sm font-medium hover:bg-[#3A453D] transition-colors">
          Open App
        </button>
      </nav>

      <section className="px-6 pt-20 pb-24 max-w-4xl mx-auto text-center">
        <div className="mb-12 flex justify-center">
          <div className="w-40 h-40 md:w-56 md:h-56 flex items-center justify-center">
            <img src="image1-removebg-preview.png" alt="Untwine Logo" className="w-full h-full object-contain" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-8 leading-tight text-[#2F3A32]">A moment of clarity<br/>when you need it most</h1>
        <p className="text-lg md:text-xl text-[#6F7A6A] mb-12 max-w-2xl mx-auto leading-relaxed">Untwine is a privacy-first sanctuary for moments of overthinking, anxiety, or overwhelm. No accounts. No tracking. Just relief in 30–120 seconds.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 w-full max-w-md mx-auto sm:max-w-none">
          <button onClick={onEnter} className="px-8 py-4 bg-[#2F3A32] text-[#E6E8E2] rounded-full text-lg font-medium hover:bg-[#3A453D] transition-all w-full sm:w-auto shadow-lg hover:shadow-xl">Try Untwine Now</button>
          <button onClick={scrollToInstall} className="px-8 py-4 bg-[#E6E8E2] text-[#2F3A32] border border-[#2F3A32]/10 rounded-full text-lg font-medium hover:bg-white transition-all w-full sm:w-auto">Learn More</button>
        </div>
        <p className="text-[#9FAF95] text-sm font-medium">Everything is free. Forever.</p>
      </section>

      <section className="bg-[#E6E8E2]/30 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#9FAF95] text-xs font-bold tracking-widest uppercase mb-4 block">One-Tap Relief</span>
            <h2 className="text-3xl md:text-4xl font-medium text-[#2F3A32]">Choose how you feel, not what to do</h2>
            <p className="mt-4 text-[#6F7A6A]">Each mode launches instantly and completes in under 2 minutes.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard icon={Heart} title="Calm Me Now" desc="Simple breathing and nervous-system regulation. Slow pacing, gentle guidance, no metrics." />
            <FeatureCard icon={Brain} title="Stop Overthinking" desc="Redirect spiraling thoughts. We don't suppress worry—we balance it with realistic positive possibilities." />
            <FeatureCard icon={GitFork} title="Help Me Decide" desc="Break complex decisions into binary choices. Timed flows prevent rumination. Action over optimization." />
            <FeatureCard icon={Compass} title="Ground Me" desc="Restore presence during panic or dissociation. Name what's here, then transition into gentle focus." />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#F3F2EE]">
        <div className="max-w-3xl mx-auto text-center bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-[#2F3A32]/5">
          <h2 className="text-2xl font-medium mb-6">The Untwine Philosophy</h2>
          <p className="text-lg text-[#6F7A6A] leading-relaxed">Overthinking is redirected, not suppressed. We acknowledge fear and uncertainty, then gently guide you to imagine how things <em>could</em> go right—balancing catastrophic thinking without denying risk.</p>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#9FAF95] text-xs font-bold tracking-widest uppercase mb-4 block">Privacy-First</span>
            <h2 className="text-3xl md:text-4xl font-medium text-[#2F3A32]">Your mind, your data, your device</h2>
            <p className="mt-4 text-[#6F7A6A] max-w-2xl mx-auto">In moments of vulnerability, privacy isn't a feature—it's safety. Untwine is built from the ground up to protect you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <PrivacyCard icon={Shield} title="No accounts" desc="No login, no registration, no personal data collection." />
            <PrivacyCard icon={WifiOff} title="Offline-first" desc="Works without internet. Your sanctuary is always available." />
            <PrivacyCard icon={Database} title="Local-only storage" desc="All data stays on your device. Nothing is synced or uploaded." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
             <PrivacyCard icon={BellOff} title="Zero pressure" desc="No streaks, no reminders, no guilt. Use it when you need it." />
             <PrivacyCard icon={Mic} title="Voice stays private" desc="Speech-to-text runs 100% on device. Audio is never saved or transmitted." />
          </div>
        </div>
      </section>

      <section id="install-section" className="py-24 px-6 bg-[#E6E8E2]/50 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#9FAF95] text-xs font-bold tracking-widest uppercase mb-4 block">Install</span>
          <h2 className="text-3xl md:text-4xl font-medium text-[#2F3A32] mb-6">Add Untwine to your home screen</h2>
          <p className="text-[#6F7A6A] mb-16 max-w-2xl mx-auto">Untwine is a Progressive Web App. Install it once, and it's always there—ready in seconds, even offline.</p>
          <div className="grid sm:grid-cols-3 gap-12 mb-16">
            <InstallStep icon={Share} step="1" title="Tap Share" desc="Open this page in Safari or Chrome, then tap the share button." />
            <InstallStep icon={Plus} step="2" title="Add to Home Screen" desc="Scroll down and tap 'Add to Home Screen' (iOS) or 'Install' (Android)." />
            <InstallStep icon={Smartphone} step="3" title="Open from Home" desc="Launch Untwine directly from your home screen—like any other app." />
          </div>
          <button onClick={onEnter} className="px-10 py-5 bg-[#2F3A32] text-[#E6E8E2] rounded-full text-xl font-medium hover:bg-[#3A453D] shadow-xl hover:scale-105 transition-all w-full sm:w-auto">Open Untwine</button>
          <p className="mt-6 text-[#6F7A6A] text-sm">Or just use it right here in your browser.</p>
        </div>
      </section>

      <AppFooter mode="light" />
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#2F3A32]/5 text-left hover:shadow-md transition-shadow h-full">
    <Icon className="w-8 h-8 text-[#2F3A32] mb-6" strokeWidth={1.5} />
    <h3 className="text-xl font-medium text-[#2F3A32] mb-3">{title}</h3>
    <p className="text-[#6F7A6A] leading-relaxed">{desc}</p>
  </div>
);

const PrivacyCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-[#F3F2EE] p-8 rounded-2xl border border-[#2F3A32]/5 text-left h-full">
    <div className="w-10 h-10 rounded-full bg-[#2F3A32]/5 flex items-center justify-center mb-4 text-[#2F3A32]">
       <Icon size={20} />
    </div>
    <h3 className="text-lg font-medium text-[#2F3A32] mb-2">{title}</h3>
    <p className="text-sm text-[#6F7A6A]">{desc}</p>
  </div>
);

const InstallStep = ({ icon: Icon, step, title, desc }) => (
  <div className="flex flex-col items-center">
    <div className="w-16 h-16 bg-[#2F3A32]/5 rounded-2xl flex items-center justify-center mb-6 text-[#2F3A32]">
      <Icon size={28} strokeWidth={1.5} />
    </div>
    <span className="text-[#9FAF95] text-xs font-bold tracking-widest uppercase mb-2">Step {step}</span>
    <h3 className="text-lg font-medium text-[#2F3A32] mb-2">{title}</h3>
    <p className="text-sm text-[#6F7A6A] max-w-[200px]">{desc}</p>
  </div>
);

// --- App Modes (Dark Theme) ---

const CalmMode = ({ lang, onExit }) => {
  const [phase, setPhase] = useState('Inhale');
  const [timer, setTimer] = useState(4);
  const t = (path) => getT(lang, path);

  useEffect(() => {
    let interval;
    const runCycle = () => {
      if (phase === 'Inhale') {
        if (timer > 1) setTimer(t => t - 1);
        else { setPhase('Hold'); setTimer(7); }
      } else if (phase === 'Hold') {
        if (timer > 1) setTimer(t => t - 1);
        else { setPhase('Exhale'); setTimer(8); }
      } else if (phase === 'Exhale') {
        if (timer > 1) setTimer(t => t - 1);
        else { setPhase('Inhale'); setTimer(4); }
      }
    };
    interval = setInterval(runCycle, 1000);
    return () => clearInterval(interval);
  }, [phase, timer]);

  const getCircleStyle = () => {
    switch(phase) {
      case 'Inhale': return 'scale-125 duration-[4000ms] ease-out';
      case 'Hold': return 'scale-125 duration-0';
      case 'Exhale': return 'scale-100 duration-[8000ms] ease-in-out';
      default: return '';
    }
  };

  const getPhaseText = () => {
    switch(phase) {
      case 'Inhale': return t('calm.inhale');
      case 'Hold': return t('calm.hold');
      case 'Exhale': return t('calm.exhale');
      default: return '';
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center relative p-6">
      <div className={`absolute top-6 z-10 ${t('dir') === 'rtl' ? 'right-6' : 'left-6'}`}>
        <button onClick={onExit} className="text-[#6F7A6A] hover:text-[#E6E8E2] transition-colors">
          <X size={32} />
        </button>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="w-72 h-72 rounded-full border border-[#9FAF95]/20 absolute"></div>
        <div className={`w-48 h-48 rounded-full bg-[#3A453D] flex items-center justify-center transition-all ${getCircleStyle()}`}>
          <div className="w-24 h-24 rounded-full bg-[#9FAF95]/20 blur-xl"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-2xl font-light text-[#E6E8E2] tracking-widest uppercase">
            {getPhaseText()}
          </span>
        </div>
      </div>
      <p className="mt-12 text-[#6F7A6A] text-sm text-center max-w-[200px]">
        4-7-8 Rhythm<br/>Resets the nervous system.
      </p>
    </div>
  );
};

const StopOverthinkingMode = ({ lang, onExit, onSave }) => {
  const t = (path) => getT(lang, path);
  const dir = t('dir');
  const [step, setStep] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const prompts = t('overthinking.step3_prompts');
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSpeechSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = getSpeechLocale(lang);
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
        }
        if (finalTranscript) setText(prev => prev + ' ' + finalTranscript);
      };
      recognitionRef.current.onerror = () => setIsListening(false);
    }
  }, [lang]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) { console.error("Mic error", e); }
    }
  };

  const finishSession = () => {
    if (text.trim()) onSave({ type: 'overthinking', date: new Date().toISOString(), content: text });
    setStep(3);
  };

  const steps = [
    <div key="s1" className="flex flex-col h-full justify-center text-center p-6"><FadeIn><h2 className="text-2xl md:text-3xl font-light text-[#E6E8E2] leading-relaxed mb-8 break-words">{t('overthinking.step1')}</h2><Button onClick={() => setStep(1)} dir={dir}>{t('common.next')}</Button></FadeIn></div>,
    <div key="s2" className="flex flex-col h-full justify-center text-center p-6"><FadeIn><h2 className="text-2xl md:text-3xl font-light text-[#9FAF95] leading-relaxed mb-8 break-words">{t('overthinking.step2')}</h2><Button onClick={() => setStep(2)} dir={dir}>{t('common.next')}</Button></FadeIn></div>,
    <div key="s3" className="flex flex-col h-full p-4 pt-12"><FadeIn className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-4"><p className="text-[#C9B7A2] text-sm font-bold uppercase tracking-widest">Reframing</p>{isSpeechSupported && (<span className="bg-[#9FAF95]/20 text-[#9FAF95] text-xs px-2 py-1 rounded-md flex items-center"><Mic size={12} className={dir === 'rtl' ? 'ml-1' : 'mr-1'} /> Voice Enabled</span>)}</div>
        <h3 className="text-xl text-[#E6E8E2] mb-6 font-light break-words">{prompt}</h3>
        <div className="flex-1 bg-[#3A453D] rounded-2xl p-4 mb-4 relative flex flex-col min-h-[150px]">
          <textarea value={text} onChange={(e) => setText(e.target.value)} className="flex-1 bg-transparent text-[#E6E8E2] resize-none focus:outline-none placeholder-[#6F7A6A] text-lg leading-relaxed" placeholder={t('overthinking.step4_input')} />
          <div className="flex justify-between items-center mt-2 border-t border-[#6F7A6A]/20 pt-3">
             <button onClick={() => setText('')} className="text-[#6F7A6A] text-sm flex items-center hover:text-red-400 transition-colors"><Trash2 size={16} className={dir === 'rtl' ? 'ml-1' : 'mr-1'}/> {t('overthinking.btn_clear')}</button>
             {isSpeechSupported && (<button onClick={toggleListening} className={`flex items-center px-4 py-2 rounded-full transition-all ${isListening ? 'bg-red-500/20 text-red-200 animate-pulse' : 'bg-[#2F3A32] text-[#9FAF95]'}`}>{isListening ? <MicOff size={18} className={dir === 'rtl' ? 'ml-2' : 'mr-2'}/> : <Mic size={18} className={dir === 'rtl' ? 'ml-2' : 'mr-2'}/>}<span className="text-sm font-medium">{isListening ? t('overthinking.btn_listening') : t('overthinking.btn_speak')}</span></button>)}
          </div>
        </div>
        <Button onClick={finishSession} dir={dir}>{t('common.done')}</Button>
    </FadeIn></div>,
    <div key="s4" className="flex flex-col h-full justify-center text-center p-6"><FadeIn><div className="w-16 h-16 rounded-full bg-[#9FAF95]/10 flex items-center justify-center mx-auto mb-6 text-[#9FAF95]"><Check size={32} /></div><h2 className="text-xl md:text-2xl font-light text-[#E6E8E2] leading-relaxed mb-12 whitespace-pre-wrap">{t('overthinking.step5')}</h2><Button variant="outline" onClick={onExit} dir={dir}>{t('common.landing_btn')}</Button></FadeIn></div>
  ];
  return <div className="h-full relative overflow-y-auto">{step < 3 && (<button onClick={onExit} className={`absolute top-6 z-10 text-[#6F7A6A] ${dir === 'rtl' ? 'right-6' : 'left-6'}`}><X size={28} /></button>)}{steps[step]}</div>;
};

const GroundMode = ({ lang, onExit }) => {
  const t = (path) => getT(lang, path);
  const dir = t('dir');
  const [currentStep, setCurrentStep] = useState(0);
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const recognitionRef = useRef(null);
  const steps = t('grounding.steps');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSpeechSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = getSpeechLocale(lang);
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
        }
        if (finalTranscript) setText(prev => prev + ' ' + finalTranscript);
      };
      recognitionRef.current.onerror = () => setIsListening(false);
    }
  }, [lang]);

  const toggleListening = () => {
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); } 
    else { try { recognitionRef.current?.start(); setIsListening(true); } catch (e) { console.error("Mic error", e); } }
  };
  const handleNext = () => { setText(''); setIsListening(false); recognitionRef.current?.stop(); if (currentStep < 4) setCurrentStep(s => s + 1); else onExit(); };

  return (
    <div className="h-full flex flex-col p-6 pt-12 overflow-y-auto">
       <button onClick={onExit} className={`absolute top-6 z-10 text-[#6F7A6A] ${dir === 'rtl' ? 'right-6' : 'left-6'}`}><X size={28} /></button>
       <FadeIn key={currentStep} className="flex-1 flex flex-col">
         <div className="mb-2"><span className="text-[#9FAF95] text-6xl font-light opacity-20">{5 - currentStep}</span></div>
         <h2 className="text-[#E6E8E2] text-3xl font-light mb-2 break-words">{steps[currentStep]}</h2>
         <p className="text-[#6F7A6A] text-lg mb-6">{t('grounding.instruction')}</p>
         <div className="flex-1 bg-[#3A453D] rounded-2xl p-4 mb-4 relative flex flex-col min-h-[150px]">
            <textarea value={text} onChange={(e) => setText(e.target.value)} className="flex-1 bg-transparent text-[#E6E8E2] resize-none focus:outline-none placeholder-[#6F7A6A] text-lg leading-relaxed" placeholder={t('overthinking.step4_input')} />
            <div className="flex justify-between items-center mt-2 border-t border-[#6F7A6A]/20 pt-3">
               <button onClick={() => setText('')} className="text-[#6F7A6A] text-sm flex items-center hover:text-red-400 transition-colors"><Trash2 size={16} className={dir === 'rtl' ? 'ml-1' : 'mr-1'}/> {t('overthinking.btn_clear')}</button>
               {isSpeechSupported && (<button onClick={toggleListening} className={`flex items-center px-4 py-2 rounded-full transition-all ${isListening ? 'bg-red-500/20 text-red-200 animate-pulse' : 'bg-[#2F3A32] text-[#9FAF95]'}`}>{isListening ? <MicOff size={18} className={dir === 'rtl' ? 'ml-2' : 'mr-2'}/> : <Mic size={18} className={dir === 'rtl' ? 'ml-2' : 'mr-2'}/>}<span className="text-sm font-medium">{isListening ? t('overthinking.btn_listening') : t('overthinking.btn_speak')}</span></button>)}
            </div>
         </div>
         <Button onClick={handleNext} dir={dir}>{currentStep < 4 ? t('common.next') : t('common.good')}</Button>
       </FadeIn>
       <div className="flex justify-center space-x-2 mt-8 pb-4">{[0,1,2,3,4].map(i => (<div key={i} className={`w-2 h-2 rounded-full ${i === currentStep ? 'bg-[#9FAF95]' : 'bg-[#3A453D]'}`} />))}</div>
    </div>
  );
};

const HelpMeDecideMode = ({ lang, onExit }) => {
  const t = (path) => getT(lang, path);
  const dir = t('dir');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [result, setResult] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const flipCoin = () => {
    if (!opt1 || !opt2) return;
    setIsFlipping(true);
    setTimeout(() => {
      const isHeads = Math.random() > 0.5;
      setResult(isHeads ? opt1 : opt2);
      setIsFlipping(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col p-6 pt-12 overflow-y-auto">
       <button onClick={onExit} className={`absolute top-6 z-10 text-[#6F7A6A] ${dir === 'rtl' ? 'right-6' : 'left-6'}`}><X size={28} /></button>
       {!result ? (
         <FadeIn className="h-full flex flex-col justify-center">
           <h2 className="text-2xl text-[#E6E8E2] font-light mb-2 text-center">{t('decision.title')}</h2>
           <p className="text-[#6F7A6A] text-center mb-8 text-sm">Enter two options. Let fate (and your gut) decide.</p>
           <div className="space-y-4 mb-8">
             <input value={opt1} onChange={e => setOpt1(e.target.value)} placeholder={t('decision.opt1')} className="w-full bg-[#3A453D] p-4 rounded-xl text-[#E6E8E2] placeholder-[#6F7A6A] focus:outline-none focus:ring-1 focus:ring-[#9FAF95]" />
             <div className="flex justify-center text-[#9FAF95] text-xs uppercase tracking-widest">VS</div>
             <input value={opt2} onChange={e => setOpt2(e.target.value)} placeholder={t('decision.opt2')} className="w-full bg-[#3A453D] p-4 rounded-xl text-[#E6E8E2] placeholder-[#6F7A6A] focus:outline-none focus:ring-1 focus:ring-[#9FAF95]" />
           </div>
           <Button onClick={flipCoin} disabled={!opt1 || !opt2 || isFlipping} dir={dir}>{isFlipping ? '...' : t('decision.flip')}</Button>
         </FadeIn>
       ) : (
         <FadeIn className="h-full flex flex-col justify-center text-center">
           <h3 className="text-[#6F7A6A] uppercase tracking-widest text-sm mb-4">{t('decision.result')}</h3>
           <div className="text-4xl text-[#E6E8E2] font-medium mb-8 break-words animate-fade-in">{result}</div>
           <div className="bg-[#3A453D] p-6 rounded-2xl mb-8 border border-[#9FAF95]/20"><p className="text-[#B4C2A7] text-lg leading-relaxed font-light">{t('decision.gut')}</p></div>
           <div className="space-y-3"><Button onClick={onExit} dir={dir}>{t('common.good')}</Button><button onClick={() => {setResult(null); setOpt1(''); setOpt2('');}} className="text-[#6F7A6A] text-sm hover:text-[#9FAF95] p-2">{t('decision.reflip')}</button></div>
         </FadeIn>
       )}
    </div>
  );
};

const PrivacyModal = ({ lang, onClose }) => {
  const content = PRIVACY_CONTENT[lang] || PRIVACY_CONTENT['en'];
  const dir = LANGUAGES[lang]?.dir || 'ltr';

  return (
    <div className="absolute inset-0 z-[60] bg-[#2F3A32] flex flex-col" dir={dir}>
      <div className="px-6 py-6 border-b border-[#3A453D] flex justify-between items-center bg-[#2F3A32] z-10">
        <h2 className="text-[#E6E8E2] text-xl font-light">{content.title}</h2>
        <button onClick={onClose} className="p-2 -mr-2 text-[#6F7A6A] hover:text-[#E6E8E2]"><X size={24}/></button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar pb-safe">
        <div className="space-y-12 max-w-2xl mx-auto">
          {content.sections.map((section, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              <h3 className="text-[#9FAF95] text-lg font-medium mb-3">{section.heading}</h3>
              <p className="text-[#E6E8E2]/80 text-base leading-relaxed whitespace-pre-line">{section.body}</p>
            </div>
          ))}
          <div className="h-12"></div>
        </div>
      </div>
    </div>
  );
};

const SettingsModal = ({ lang, setLang, onClose, onClear, history, onOpenPrivacy }) => {
  const t = (path) => getT(lang, path);
  const dir = t('dir');
  const handleExport = () => {
    const dataStr = JSON.stringify(localStorage);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `untwine_backup_${new Date().toISOString().slice(0,10)}.json`);
    linkElement.click();
  };
  const handleImport = (event) => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    fileReader.onload = e => {
      try { const parsed = JSON.parse(e.target.result); Object.keys(parsed).forEach(k => localStorage.setItem(k, parsed[k])); window.location.reload(); } catch (err) { alert("Invalid backup file"); }
    };
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#2F3A32] flex flex-col overflow-hidden">
      {/* Wrapper to match App Page spacing/centering */}
      <div className="h-full flex flex-col p-6 max-w-2xl mx-auto w-full">
        
        <div className="flex justify-between items-center mb-8 shrink-0">
          <div className="flex items-center space-x-3">
            <img src="image1-removebg-preview.png" alt="Untwine" className="w-14 h-14 object-contain" />
            <h2 className="text-[#E6E8E2] text-xl font-bold">{t('common.settings')}</h2>
          </div>
          <button onClick={onClose}><X className="text-[#6F7A6A]" /></button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 pb-20 custom-scrollbar">
          <div className="mb-8">
            <label className="block text-[#6F7A6A] text-sm uppercase tracking-wider mb-4 flex items-center"><Globe size={16} className={dir === 'rtl' ? 'ml-2' : 'mr-2'} />{t('common.language')}</label>
            <div className="relative">
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full bg-[#3A453D] text-[#E6E8E2] border border-[#6F7A6A]/30 rounded-xl p-4 pr-12 appearance-none focus:outline-none focus:border-[#9FAF95] transition-colors text-lg" dir={dir}>
                {Object.keys(LANGUAGES).map((code) => (<option key={code} value={code} className="bg-[#2F3A32]">{LANGUAGES[code].label || code}</option>))}
              </select>
              <ChevronDown className={`absolute top-1/2 -translate-y-1/2 text-[#9FAF95] pointer-events-none ${dir === 'rtl' ? 'left-4' : 'right-4'}`} size={20} />
            </div>
          </div>
          <div className="space-y-4">
            <label className="block text-[#6F7A6A] text-sm uppercase tracking-wider mb-2">Data & Privacy</label>
            <button onClick={onOpenPrivacy} className="w-full py-4 rounded-xl bg-[#3A453D]/50 border border-[#9FAF95]/30 text-[#9FAF95] flex items-center justify-center hover:bg-[#3A453D] transition-colors mb-2"><FileText size={18} className={dir === 'rtl' ? 'ml-2' : 'mr-2'} />{t('common.privacy')}</button>
            <button onClick={handleExport} className="w-full py-4 rounded-xl bg-[#3A453D] text-[#E6E8E2] flex items-center justify-center hover:bg-[#3A453D]/80"><Download size={18} className={dir === 'rtl' ? 'ml-2' : 'mr-2'} />{t('common.backup')}</button>
            <div className="relative w-full"><input type="file" onChange={handleImport} className="absolute inset-0 opacity-0 z-10 cursor-pointer" /><div className="w-full py-4 rounded-xl border border-[#6F7A6A]/30 text-[#9FAF95] flex items-center justify-center"><Upload size={18} className={dir === 'rtl' ? 'ml-2' : 'mr-2'} />{t('common.restore')}</div></div>
            <button onClick={onClear} className="w-full py-4 rounded-xl border border-red-900/50 text-red-400/80 flex items-center justify-center hover:bg-red-900/10 transition-colors mt-8"><Trash2 size={18} className={dir === 'rtl' ? 'ml-2' : 'mr-2'} />{t('common.clear_data')}</button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-[#6F7A6A]/10 text-center pb-8">
             <p className="text-xs text-white leading-relaxed font-light opacity-90">
               Untwine is not therapy and is not a substitute for professional mental health care. If you are in crisis, please contact a mental health professional or crisis helpline. <br/>
               <a href="https://findahelpline.com/" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-[#9FAF95] transition-colors mt-1 inline-block">https://findahelpline.com/</a>
               <br/><br/>
               Contact us at <a href="mailto:contact@untwine.app" className="hover:text-[#9FAF95] transition-colors">contact@untwine.app</a>
             </p>
             <div className="flex justify-center mt-8 opacity-40">
                <img src="image1-removebg-preview.png" alt="Untwine Logo" className="w-20 h-20 object-contain" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ lang, setView, openSettings }) => {
  const t = (path) => getT(lang, path);
  const dir = t('dir');
  const modes = [
    { id: 'calm', label: t('modes.calm'), icon: Wind },
    { id: 'stop', label: t('modes.stop'), icon: Brain }, // Primary flag removed to fix inconsistent visual
    { id: 'decide', label: t('modes.decide'), icon: HelpCircle },
    { id: 'ground', label: t('modes.ground'), icon: Anchor },
  ];

  return (
    <div className="h-full flex flex-col p-6 animate-fade-in max-w-2xl mx-auto w-full">
      <header className="flex justify-between items-center mb-8 pt-2 shrink-0">
        <div className="flex items-center space-x-3"><img src="image1-removebg-preview.png" alt="Untwine" className="w-14 h-14 object-contain" /><span className="text-[#E6E8E2] text-lg font-medium tracking-wide">Untwine</span></div>
        <button onClick={openSettings} className="p-2 text-[#6F7A6A] hover:text-[#9FAF95] transition-colors"><Settings size={22} /></button>
      </header>
      <main className="flex-1 flex flex-col space-y-4 overflow-y-auto custom-scrollbar pb-6">
        {modes.map((mode) => (
          <button key={mode.id} onClick={() => setView(mode.id)} className={`w-full p-6 rounded-2xl flex items-center justify-between group transition-all duration-300 touch-manipulation min-h-[5rem] flex-shrink-0 ${mode.primary ? 'bg-[#3A453D] border-2 border-[#9FAF95]/20 shadow-lg' : 'bg-[#3A453D]/50 border border-transparent hover:bg-[#3A453D]'}`}>
            <div className="flex items-center"><div className={`p-3 rounded-full ${dir === 'rtl' ? 'ml-4' : 'mr-4'} ${mode.primary ? 'bg-[#9FAF95]/20 text-[#9FAF95]' : 'bg-[#2F3A32] text-[#6F7A6A] group-hover:text-[#9FAF95]'}`}><mode.icon size={24} /></div><span className={`text-lg font-medium ${mode.primary ? 'text-[#E6E8E2]' : 'text-[#E6E8E2]/80'}`}>{mode.label}</span></div>
            {dir === 'rtl' ? (<ArrowRight size={20} className={`transform rotate-180 transition-transform group-hover:-translate-x-1 ${mode.primary ? 'text-[#9FAF95]' : 'text-[#6F7A6A]'}`} />) : (<ArrowRight size={20} className={`transform transition-transform group-hover:translate-x-1 ${mode.primary ? 'text-[#9FAF95]' : 'text-[#6F7A6A]'}`} />)}
          </button>
        ))}
        <AppFooter mode="dark" />
      </main>
    </div>
  );
};

// --- Main App Controller ---

export default function UntwineApp() {
  const [view, setView] = useState('landing');
  const [lang, setLang] = useState('en');
  const [showSettings, setShowSettings] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone || document.referrer.includes('android-app://');
    const savedLang = localStorage.getItem('untwine_lang');
    if (savedLang) setLang(savedLang);
    const visited = localStorage.getItem('untwine_visited');
    const savedHistory = localStorage.getItem('untwine_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (isStandalone) { setView('home'); } else if (visited) { setView('home'); }
  }, []);

  useEffect(() => { localStorage.setItem('untwine_lang', lang); }, [lang]);

  const saveEntry = (entry) => {
    const newHistory = [entry, ...history];
    setHistory(newHistory);
    localStorage.setItem('untwine_history', JSON.stringify(newHistory));
  };

  const enterApp = () => { localStorage.setItem('untwine_visited', 'true'); setView('home'); };
  const getDir = () => { const l = LANGUAGES[lang] || LANGUAGES['en']; return l.dir || 'ltr'; };
  const isLanding = view === 'landing';

  return (
    <div className={`w-full h-[100dvh] overflow-hidden font-sans selection:bg-[#9FAF95] selection:text-[#2F3A32] flex items-center justify-center ${isLanding ? 'bg-[#F3F2EE] text-[#2F3A32]' : 'bg-[#2F3A32] text-[#E6E8E2]'}`} dir={getDir()}>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #6F7A6A; border-radius: 4px; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
      `}</style>
      
      {isLanding ? (
        <div className="w-full h-full overflow-y-auto"><WebsiteLanding onEnter={enterApp} /></div>
      ) : (
        <div className="w-full h-full relative shadow-2xl bg-[#2F3A32] overflow-hidden transition-all duration-300">
          {view === 'home' && <Dashboard lang={lang} setView={setView} openSettings={() => setShowSettings(true)} />}
          {view === 'stop' && <div className="max-w-2xl mx-auto h-full"><StopOverthinkingMode lang={lang} onExit={() => setView('home')} onSave={saveEntry} /></div>}
          {view === 'calm' && <div className="max-w-2xl mx-auto h-full"><CalmMode lang={lang} onExit={() => setView('home')} /></div>}
          {view === 'ground' && <div className="max-w-2xl mx-auto h-full"><GroundMode lang={lang} onExit={() => setView('home')} /></div>}
          {view === 'decide' && <div className="max-w-2xl mx-auto h-full"><HelpMeDecideMode lang={lang} onExit={() => setView('home')} /></div>}
          {showSettings && (<SettingsModal lang={lang} setLang={setLang} history={history} onClose={() => setShowSettings(false)} onOpenPrivacy={() => setShowPrivacy(true)} onClear={() => { if(window.confirm("Delete all data? This cannot be undone.")) { localStorage.clear(); window.location.reload(); } }} />)}
          {showPrivacy && (<PrivacyModal lang={lang} onClose={() => setShowPrivacy(false)} />)}
        </div>
      )}
    </div>
  );
}