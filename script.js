
const ADMIN_PASSWORD = "223311";

const OWNER = {
  name: "You",
  role: "Owner",
  protected: true
};

const BO_ADMIN = {
  name: "Bo Admin",
  role: "Admin",
  protected: true
};

let members = [
  OWNER,
  BO_ADMIN
];

let isAdmin = false;

const $ = id => document.getElementById(id);

function joinGroup() {
  const name = $("joinName").value.trim();

  if (!name) {
    $("joinMessage").textContent = "Please enter your name.";
    return;
  }

  if (members.some(m => m.name.toLowerCase() === name.toLowerCase())) {
    $("joinMessage").textContent = "This name is already in the group.";
    return;
  }

  members.push({
    name,
    role: "Member",
    protected: false
  });

  $("joinName").value = "";
  $("joinMessage").textContent = "Welcome to Pharasi Group!";
  renderMembers();
}

function loginAdmin() {
  if ($("adminPassword").value !== ADMIN_PASSWORD) {
    $("loginMessage").textContent = "Wrong password!";
    return;
  }

  isAdmin = true;
  $("loginPage").classList.add("hidden");
  $("adminPanel").classList.remove("hidden");
  $("loginMessage").textContent = "";
  renderMembers();
}

function renderMembers() {
  $("publicMembers").replaceChildren();
  $("adminMembers").replaceChildren();

  members.forEach((member, index) => {
    const publicItem = document.createElement("div");
    publicItem.className = "member";
    publicItem.textContent = `${member.name} — ${member.role}`;
    $("publicMembers").appendChild(publicItem);

    if (isAdmin) {
      const item = document.createElement("div");
      item.className = "member";

      const label = document.createElement("p");
      label.textContent = `${member.name} — ${member.role}`;
      item.appendChild(label);

      if (!member.protected) {
        const remove = document.createElement("button");
        remove.className = "danger";
        remove.textContent = "Remove Member";

        remove.addEventListener("click", () => {
          members.splice(index, 1);
          renderMembers();
        });

        item.appendChild(remove);
      }

      $("adminMembers").appendChild(item);
    }
  });
}

$("joinBtn").addEventListener("click", joinGroup);
$("loginBtn").addEventListener("click", loginAdmin);

$("adminPassword").addEventListener("keydown", event => {
  if (event.key === "Enter") loginAdmin();
});

$("logoutBtn").addEventListener("click", () => {
  isAdmin = false;
  $("adminPanel").classList.add("hidden");
  $("loginPage").classList.remove("hidden");
  $("adminPassword").value = "";
  renderMembers();
});

renderMembers();
