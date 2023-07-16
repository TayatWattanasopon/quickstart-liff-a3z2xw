// Import stylesheets
import './style.css';

// Body element
const body = document.getElementById('body');

// Button elements
const btnSend = document.getElementById('btnSend');
const btnClose = document.getElementById('btnClose');
const btnShare = document.getElementById('btnShare');
const btnLogIn = document.getElementById('btnLogIn');
const btnLogOut = document.getElementById('btnLogOut');
const btnScanCode = document.getElementById('btnScanCode');
const btnOpenWindow = document.getElementById('btnOpenWindow');

// Profile elements
const email = document.getElementById('email');
const userId = document.getElementById('userId');
const pictureUrl = document.getElementById('pictureUrl');
const displayName = document.getElementById('displayName');
// const statusMessage = document.getElementById('statusMessage');

// QR element
const code = document.getElementById('code');
const friendShip = document.getElementById('friendShip');
async function main() {
  // Initialize LIFF app)
  await liff.init({ liffId: '2000141235-kLKnmg5M' });
  // Try a LIFF function
  switch (liff.getOS()) {
    case 'android':
      body.style.backgroundColor = '#F0FBFF';
      break;
    case 'ios':
      body.style.backgroundColor = '#F0FBFF';
      break;
  }
  getUserProfile();
  if (!liff.isInClient()) {
    if (liff.isLoggedIn()) {
      getUserProfile();
    } else {
      liff.login();
    }
  } else {
    btnLink.style.display = 'block';
    getUserProfile();
  }
}

async function getUserProfile() {
  const profile = await liff.getProfile();
  pictureUrl.src = profile.pictureUrl;
  userId.innerHTML = '<b>User ID:</b> ' + profile.userId;
  // statusMessage.innerHTML = '<b>statusMessage:</b> ' + profile.statusMessage;
  displayName.innerHTML = '<b>Display Name:</b> ' + profile.displayName;
  email.innerHTML = '<b>Email:</b> ' + liff.getDecodedIDToken().email;
}

main();

async function sendMsg(MessageType) {
  if (
    liff.getContext().type !== 'none' &&
    liff.getContext().type !== 'external'
  ) {
    await liff.sendMessages([
      {
        type: 'text',
        text: MessageType,
      },
    ]);
    // await liff.sendMessages(lineResponseMessageS);
    // alert('Message sent');
    liff.closeWindow();
  }
}

async function shareMsg() {
  await liff.shareTargetPicker([
    {
      type: 'image',
      originalContentUrl: 'https://d.line-scdn.net/stf/line-lp/2016_en_02.jpg',
      previewImageUrl: 'https://d.line-scdn.net/stf/line-lp/2016_en_02.jpg',
    },
  ]);
}

async function scanCode() {
  const result = await liff.scanCode();
  code.innerHTML = '<b>Code: </b>' + result.value;
}

// btnLogIn.onclick = () => {
//   liff.login();
// };

// btnLogOut.onclick = () => {
//   liff.logout();
//   window.location.reload();
// };

btnUnlink.onclick = () => {
  sendMsg('Unlink User');
};

// btnUnlink.onclick = () => {
//   sendMsg('Unlink User');
// };
// btnShare.onclick = () => {
//   shareMsg();
// };

// btnScanCode.onclick = () => {
//   scanCode();
// };
