const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("#mainNav");
if (menuBtn) menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const officeAddress = "Shanti Interior, Raebareli, Uttar Pradesh, India";
const mapQuery = "Shanti Interior Raebareli Uttar Pradesh";
const addressEl = document.getElementById("officeAddress");
const mapLink = document.getElementById("mapLink");
if (addressEl) addressEl.textContent = officeAddress;
if (mapLink) mapLink.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(mapQuery);

const leadForm = document.getElementById("leadForm");
if (leadForm) {
  leadForm.addEventListener("submit", function (e) {
    const isNetlify = window.location.hostname.endsWith("netlify.app") || window.location.hostname.includes("netlify");
    if (isNetlify) return; // Netlify stores the enquiry form submission.
    e.preventDefault();

    const data = new FormData(leadForm);
    const name = data.get("name") || "";
    const phone = data.get("phone") || "";
    const city = data.get("city") || "Other";
    const service = data.get("service") || "";
    const requirement = data.get("message") || "";
    const message = `Hello Shanti Interior, I have a project enquiry.%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0ACity: ${encodeURIComponent(city)}%0AService: ${encodeURIComponent(service)}%0ARequirement: ${encodeURIComponent(requirement)}`;

    let recipients;
    if (city === "Raebareli") {
      recipients = [{ number: "919569390204", name: "Nitish — Raebareli" }];
    } else if (city === "Lucknow" || city === "Kanpur") {
      recipients = [
        { number: "918887311583", name: "Anurag — Lucknow / Kanpur" },
        { number: "919807752627", name: "Nilesh — Lucknow / Kanpur" }
      ];
    } else {
      recipients = [
        { number: "919569390204", name: "Nitish — Raebareli" },
        { number: "918887311583", name: "Anurag — Lucknow / Kanpur" },
        { number: "919807752627", name: "Nilesh — Lucknow / Kanpur" }
      ];
    }

    const oldBox = document.getElementById("extraWhatsAppLinks");
    if (oldBox) oldBox.remove();
    const box = document.createElement("div");
    box.id = "extraWhatsAppLinks";
    box.className = "extra-wa-links";
    const heading = document.createElement("strong");
    heading.textContent = city === "Raebareli"
      ? "Your Raebareli enquiry is ready for Nitish:"
      : "Choose each contact to send the enquiry separately:";
    box.appendChild(heading);

    recipients.forEach((recipient, index) => {
      const a = document.createElement("a");
      a.href = `https://wa.me/${recipient.number}?text=${message}`;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = `Open WhatsApp — ${recipient.name}`;
      box.appendChild(a);
    });
    leadForm.appendChild(box);
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}
