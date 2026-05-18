// 1. ดึงโครงสร้างจาก HTML มาใช้งานใน JavaScript
const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');
const ampSlider = document.getElementById('amp');
const ampVal = document.getElementById('ampVal');

// 2. ตั้งค่าตัวแปรทางฟิสิกส์และระบบ
let t = 0;             // ตัวแปรเวลาเริ่มต้น
const omega = 3.0;     // ความถี่เชิงมุม (ω) คงที่สม่ำเสมอ

// 3. ฟังก์ชันหลักในการคำนวณฟิสิกส์และวาดภาพทีละเฟรม
function animate() {
    // ดึงค่า Amplitude ปัจจุบันจาก Slider
    let A = parseFloat(ampSlider.value);
    ampVal.innerText = A.toFixed(1); // อัปเดตตัวเลขบนหน้าจอเว็บ
    
    // คำนวณสูตร SHM: x = A * cos(ωt)
    let current_x = A * Math.cos(omega * t);
    
    // เคลียร์ภาพในเฟรมเก่าทิ้งทั้งหมดก่อนวาดใหม่ (เหมือนการลบกระดานดำ)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // แปลงพิกัดฟิสิกส์ ให้กลายเป็นพิกัดพิกเซลบนหน้าจอ
    // ให้จุดศูนย์กลาง (สมดุล) อยู่ที่ความสูง 130px และขยายขนาดการเคลื่อนที่ขึ้น 25 เท่า
    let pixel_y = 130 + (current_x * 25); 

    // --- เริ่มกระบวนการวาดภาพ ---

    // ชิ้นส่วนที่ 1: วาดเพดาน (เส้นตรงสีดำหนา) ที่ความสูง Y = 40
    ctx.strokeStyle = '#000000'; 
    ctx.lineWidth = 4;
    ctx.beginPath(); 
    ctx.moveTo(50, 40);   // จุดเริ่มฝั่งซ้าย
    ctx.lineTo(350, 40);  // ลากไปฝั่งขวา
    ctx.stroke();

    // ชิ้นส่วนที่ 2: วาดสปริง (ใช้เส้นปะสีเทา ลากจากเพดานลงมาหามวลวัตถุ)
    ctx.strokeStyle = '#a0aec0'; 
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 6]); // สั่งให้เป็นเส้นปะ (ขนาดยาว 6px เว้น 6px)
    ctx.beginPath(); 
    ctx.moveTo(200, 40);      // ยึดที่เพดานตรงกลาง
    ctx.lineTo(200, pixel_y); // ลากลงมาตามพิกัดมวลวัตถุที่คำนวณได้
    ctx.stroke();

    // ชิ้นส่วนที่ 3: วาดมวลวัตถุ (วงกลมสีฟ้า)
    ctx.fillStyle = '#1f77b4'; 
    ctx.setLineDash([]); // ปิดโหมดเส้นปะ (กลับมาเป็นเส้นทึบเพื่อระบายสีวงกลม)
    ctx.beginPath(); 
    // วาดวงกลมที่ตำแหน่งตรงกลาง X=200, Y=ตามแรงสปริง, รัศมีกว้าง 18px
    ctx.arc(200, pixel_y, 18, 0, Math.PI * 2); 
    ctx.fill();

    // 4. เพิ่มเวลาทีละนิด เพื่อให้เฟรมถัดไปสปริงขยับตำแหน่ง
    t += 0.03;

    // 5. สั่งให้เบราว์เซอร์เรียกฟังก์ชัน animate นี้ซ้ำในเฟรมถัดไปอัตโนมัติ (ประมาณ 60 เฟรมต่อวินาที)
    requestAnimationFrame(animate);
}

// สั่งให้ฟังก์ชันเริ่มทำงานครั้งแรกสุด
animate();
