// ============================================
// AURIOM ADMIN PANEL — Dashboard Script
// ============================================

const SUPABASE_URL = 'https://oqrxwwcxpduxqvyeatni.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcnh3d2N4cGR1eHF2eWVhdG5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMjYzMjUsImV4cCI6MjA5NTcwMjMyNX0.-cDF_UN2LmlilXAoNxaEBQam4A-q45reEtIrGlcnoAo';

// Global state
let db = null;
let users = [];
let products = [];
let categories = [];
let coupons = [];
let orders = [];
let payments = [];
let tags = [];
let banners = [];

// Editing state
let editingProductId = null;
let editingCategoryId = null;
let editingCouponId = null;
let editingTagId = null;
let editingBannerId = null;

// Chart instances (for destroy/recreate)
let revenueChartInstance = null;
let orderStatusChartInstance = null;
let salesComparisonChartInstance = null;
let categorySalesChartInstance = null;
let topProductsChartInstance = null;

// ============================================
// INIT — wait for DOM + all CDN scripts
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Init Supabase
    if (window.supabase && typeof window.supabase.createClient === 'function') {
        db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log('[Admin] ✅ Supabase ready');
    } else {
        console.error('[Admin] ❌ Supabase CDN not loaded');
        alert('Failed to load Supabase SDK. Please reload the page.');
        return;
    }

    // 2. Chart.js defaults
    if (typeof Chart !== 'undefined') {
        Chart.defaults.color = '#475569';
        Chart.defaults.borderColor = '#e2e8f0';
    }

    // 3. Check auth
    const loggedIn = localStorage.getItem('auriom_admin_logged_in');
    const adminUserJson = localStorage.getItem('auriom_admin_user');

    if (loggedIn !== 'true' || !adminUserJson) {
        window.location.replace('login.html');
        return;
    }

    // Set admin avatar
    try {
        const adminUser = JSON.parse(adminUserJson);
        const avatarEl = document.getElementById('adminAvatar');
        if (avatarEl && adminUser.name) {
            avatarEl.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(adminUser.name)}&background=0D8ABC&color=fff`;
        }
    } catch (e) { /* ignore parse error */ }

    // 4. Setup UI (nav, modals)
    setupNavigation();
    setupModals();
    setupFormHandlers();

    // 5. Load all data from Supabase
    await loadAllData();
});

// ============================================
// NAVIGATION
// ============================================
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-links li');
    const views = document.querySelectorAll('.view');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            views.forEach(view => view.classList.remove('active'));
            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) targetEl.classList.add('active');
            window.dispatchEvent(new Event('resize'));

            // Clear search when switching tabs
            const mainSearch = document.querySelector('.search-bar input');
            if (mainSearch) mainSearch.value = '';
            // Reset all section filters to empty search
            renderUsers('');
            renderProducts('');
            renderCategories('');
            renderCoupons('');
            renderOrders('');
            renderPayments('');
            renderTags('');
        });
    });

    // Wire up top search bar
    const mainSearchInput = document.querySelector('.search-bar input');
    if (mainSearchInput) {
        mainSearchInput.addEventListener('input', (e) => {
            const q = e.target.value.toLowerCase().trim();
            const activeSection = document.querySelector('.view.active');
            if (!activeSection) return;
            const sectionId = activeSection.id;

            if (sectionId === 'users') {
                const input = document.getElementById('searchUsers');
                if (input) input.value = e.target.value;
                renderUsers(q);
            } else if (sectionId === 'products') {
                const input = document.getElementById('searchProducts');
                if (input) input.value = e.target.value;
                renderProducts(q);
            } else if (sectionId === 'categories') {
                const input = document.getElementById('searchCategories');
                if (input) input.value = e.target.value;
                renderCategories(q);
            } else if (sectionId === 'tags') {
                const input = document.getElementById('searchTags');
                if (input) input.value = e.target.value;
                renderTags(q);
            } else if (sectionId === 'orders') {
                const input = document.getElementById('searchOrders');
                if (input) input.value = e.target.value;
                renderOrders(q);
            } else if (sectionId === 'payment') {
                const input = document.getElementById('searchPayments');
                if (input) input.value = e.target.value;
                renderPayments(q);
            } else if (sectionId === 'coupons') {
                const input = document.getElementById('searchCoupons');
                if (input) input.value = e.target.value;
                renderCoupons(q);
            }
        });
    }
}

// ============================================
// MODALS
// ============================================
function setupModals() {
    window.openModal = function(id) {
        const el = document.getElementById(id);
        if (el) el.classList.add('active');
    };
    window.closeModal = function(id) {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
        // Reset editing state on close
        if (id === 'productModal') { editingProductId = null; document.getElementById('productModalTitle').innerText = 'Add Product'; }
        if (id === 'categoryModal') { editingCategoryId = null; document.getElementById('categoryModalTitle').innerText = 'Add Category'; }
        if (id === 'couponModal') { editingCouponId = null; document.getElementById('couponModalTitle').innerText = 'Add Coupon'; }
        if (id === 'tagModal') { editingTagId = null; document.getElementById('tagModalTitle').innerText = 'Add Tag'; }
        if (id === 'bannerModal') { editingBannerId = null; document.getElementById('bannerModalTitle').innerText = 'Add Banner'; }
    };
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                // Reset editing state
                editingProductId = null;
                editingCategoryId = null;
                editingCouponId = null;
                editingTagId = null;
                editingBannerId = null;
            }
        });
    });
}

// ============================================
// LOGOUT
// ============================================
window.adminLogout = function() {
    localStorage.removeItem('auriom_admin_logged_in');
    localStorage.removeItem('auriom_admin_user');
    window.location.replace('login.html');
};

// ============================================
// DATA LOADING
// ============================================
async function loadAllData() {
    if (!db) {
        console.error('[Admin] Cannot load data — Supabase not initialized');
        return;
    }

    console.log('[Admin] Loading all data...');

    const results = await Promise.allSettled([
        fetchTable('users'),
        fetchTable('products'),
        fetchTable('categories'),
        fetchTable('coupons'),
        fetchTable('orders'),
        fetchTable('payments'),
        fetchTable('tags'),
        fetchTable('banners'),
    ]);

    // Assign results
    if (results[0].status === 'fulfilled' && results[0].value) users = results[0].value;
    if (results[1].status === 'fulfilled' && results[1].value) products = results[1].value;
    if (results[2].status === 'fulfilled' && results[2].value) categories = results[2].value;
    if (results[3].status === 'fulfilled' && results[3].value) coupons = results[3].value;
    if (results[4].status === 'fulfilled' && results[4].value) orders = results[4].value;
    if (results[5].status === 'fulfilled' && results[5].value) payments = results[5].value;
    if (results[6].status === 'fulfilled' && results[6].value) tags = results[6].value;
    if (results[7].status === 'fulfilled' && results[7].value) banners = results[7].value;

    console.log('[Admin] Data loaded:', {
        users: users.length,
        products: products.length,
        categories: categories.length,
        coupons: coupons.length,
        orders: orders.length,
        payments: payments.length,
        tags: tags.length,
        banners: banners.length,
    });

    // Render all views
    renderUsers();
    renderProducts();
    renderCategories();
    renderCoupons();
    renderOrders();
    renderPayments();
    renderTags();
    renderBanners();
    populateProductCategorySelect();
    populateBannerCategorySelect();
    populateProductTagsSelect();
    updateDashboardStats();
    loadAdminSettings();
}

// ============================================
// ADMIN SETTINGS — Load & Save Profile
// ============================================
function loadAdminSettings() {
    try {
        const adminJson = localStorage.getItem('auriom_admin_user');
        if (!adminJson) return;
        const admin = JSON.parse(adminJson);

        // Populate avatar display
        const avatarEl = document.getElementById('adminProfileAvatar');
        if (avatarEl && admin.name) {
            avatarEl.innerText = admin.name.charAt(0).toUpperCase();
        }

        // Populate display badges
        const nameDisplay = document.getElementById('adminProfileDisplayName');
        const emailDisplay = document.getElementById('adminProfileDisplayEmail');
        const roleDisplay = document.getElementById('adminProfileDisplayRole');

        if (nameDisplay) nameDisplay.innerText = admin.name || 'Admin';
        if (emailDisplay) emailDisplay.innerText = admin.email || '';
        if (roleDisplay) roleDisplay.innerText = admin.is_admin ? 'Super Admin' : 'Admin';

        // Populate editable form fields
        const idField = document.getElementById('adminProfileId');
        const nameField = document.getElementById('adminProfileName');
        const emailField = document.getElementById('adminProfileEmail');
        const phoneField = document.getElementById('adminProfilePhone');
        const statusField = document.getElementById('adminProfileStatus');

        if (idField) idField.value = admin.id || '';
        if (nameField) nameField.value = admin.name || '';
        if (emailField) emailField.value = admin.email || '';
        if (phoneField) phoneField.value = admin.phone || '';
        if (statusField) statusField.value = admin.status || 'Active';

    } catch (e) {
        console.error('[Admin] Failed to load admin settings:', e);
    }

    // Setup form submit handler
    const adminProfileForm = document.getElementById('adminProfileForm');
    if (adminProfileForm) {
        // Only attach once
        adminProfileForm.removeEventListener('submit', handleAdminProfileSave);
        adminProfileForm.addEventListener('submit', handleAdminProfileSave);
    }
}

async function handleAdminProfileSave(e) {
    e.preventDefault();
    const btn = document.getElementById('adminProfileSaveBtn');
    const msg = document.getElementById('adminProfileMsg');
    if (btn) { btn.disabled = true; btn.innerText = 'Saving...'; }

    const adminId = document.getElementById('adminProfileId')?.value;
    const newName = document.getElementById('adminProfileName')?.value.trim();
    const newPhone = document.getElementById('adminProfilePhone')?.value.trim();
    const newPassword = document.getElementById('adminProfilePassword')?.value;

    if (!adminId) {
        if (msg) { msg.style.display = 'inline'; msg.style.color = 'red'; msg.innerText = 'Error: Admin ID not found. Please re-login.'; }
        if (btn) { btn.disabled = false; btn.innerText = 'Save Profile Changes'; }
        return;
    }

    const updatePayload = { name: newName, phone: newPhone };
    if (newPassword && newPassword.trim().length > 0) {
        updatePayload.password = newPassword.trim();
    }

    const { data, error } = await db.from('users').update(updatePayload).eq('id', adminId).select().single();

    if (error) {
        if (msg) { msg.style.display = 'inline'; msg.style.color = 'red'; msg.innerText = 'Save failed: ' + error.message; }
    } else {
        // Update localStorage with new data
        const existing = JSON.parse(localStorage.getItem('auriom_admin_user') || '{}');
        const updated = { ...existing, ...data };
        localStorage.setItem('auriom_admin_user', JSON.stringify(updated));

        // Refresh display
        const nameDisplay = document.getElementById('adminProfileDisplayName');
        if (nameDisplay) nameDisplay.innerText = updated.name || 'Admin';
        const avatarEl = document.getElementById('adminProfileAvatar');
        if (avatarEl && updated.name) avatarEl.innerText = updated.name.charAt(0).toUpperCase();

        // Update top navbar avatar
        const topAvatarEl = document.getElementById('adminAvatar');
        if (topAvatarEl && updated.name) {
            topAvatarEl.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(updated.name)}&background=0D8ABC&color=fff`;
        }

        // Clear password field
        const pwField = document.getElementById('adminProfilePassword');
        if (pwField) pwField.value = '';

        if (msg) { msg.style.display = 'inline'; msg.style.color = '#10b981'; msg.innerText = '✓ Profile saved successfully!'; }
        setTimeout(() => { if (msg) msg.style.display = 'none'; }, 3500);
    }

    if (btn) { btn.disabled = false; btn.innerText = 'Save Profile Changes'; }
}

async function fetchTable(tableName) {
    const orderCol = (tableName === 'orders' || tableName === 'payments') ? 'created_at' : 'id';
    const asc = (tableName !== 'orders' && tableName !== 'payments');

    const { data, error } = await db.from(tableName).select('*').order(orderCol, { ascending: asc });

    if (error) {
        console.error(`[Admin] Error fetching ${tableName}:`, error.message);
        return [];
    }
    return data || [];
}

// ============================================
// FILE UPLOADS & CLEANUP TO SUPABASE STORAGE
// ============================================
async function deleteFileFromSupabase(url) {
    if (!url || !db) return;
    try {
        if (url.includes('/storage/v1/object/public/auriom-images/')) {
            const parts = url.split('/storage/v1/object/public/auriom-images/');
            const filePath = parts[parts.length - 1];
            if (filePath) {
                console.log('[Admin] Smart Cleanup: Deleting file from storage:', filePath);
                const { error } = await db.storage
                    .from('auriom-images')
                    .remove([filePath]);
                if (error) {
                    console.error('[Admin] Error deleting file from storage:', error.message);
                } else {
                    console.log('[Admin] Successfully deleted file:', filePath);
                }
            }
        }
    } catch (e) {
        console.error('[Admin] Failed to delete file:', e);
    }
}

async function uploadFileToSupabase(file) {
    if (!db) {
        console.error('[Admin] Supabase client not initialized');
        return null;
    }
    
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}.${ext}`;
    
    console.log('[Admin] Uploading file to storage:', fileName);
    
    const { data, error } = await db.storage
        .from('auriom-images')
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        });
        
    if (error) {
        console.error('[Admin] Storage upload error:', error.message);
        alert('Upload failed: ' + error.message);
        return null;
    }
    
    const { data: publicUrlData } = db.storage
        .from('auriom-images')
        .getPublicUrl(fileName);
        
    console.log('[Admin] File uploaded. Public URL:', publicUrlData.publicUrl);
    return publicUrlData.publicUrl;
}

window.handleImageUpload = async function(fileInput, targetInputId) {
    const file = fileInput.files[0];
    if (!file) return;
    
    const uploadBtn = fileInput.nextElementSibling;
    const originalText = uploadBtn.innerHTML;
    uploadBtn.disabled = true;
    uploadBtn.innerHTML = '<ion-icon name="sync-outline" class="spin"></ion-icon> Uploading...';
    
    try {
        // Smart image replacement: clean up old image if present in the input slot
        const oldUrl = document.getElementById(targetInputId).value.trim();
        if (oldUrl) {
            await deleteFileFromSupabase(oldUrl);
        }

        const publicUrl = await uploadFileToSupabase(file);
        if (publicUrl) {
            document.getElementById(targetInputId).value = publicUrl;
            document.getElementById(targetInputId).dispatchEvent(new Event('input'));
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred during file upload.');
    } finally {
        uploadBtn.disabled = false;
        uploadBtn.innerHTML = originalText;
        fileInput.value = '';
    }
};

// ============================================
// RENDER: USERS (with search)
// ============================================
function renderUsers(filter = '') {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const q = filter.toLowerCase().trim();
    const filtered = q ? users.filter(u =>
        (u.name || '').toLowerCase().includes(q) ||
        (u.email || '').toLowerCase().includes(q) ||
        (u.phone || '').toLowerCase().includes(q)
    ) : users;

    filtered.forEach(user => {
        const isAdminBadge = user.is_admin
            ? `<span class="badge" style="background:#10b981; color:#fff; padding: 4px 8px; border-radius: 4px; cursor:pointer;" onclick="toggleAdmin(${user.id}, false)">Yes (Admin)</span>`
            : `<span class="badge" style="background:#475569; color:#fff; padding: 4px 8px; border-radius: 4px; cursor:pointer;" onclick="toggleAdmin(${user.id}, true)">No (Customer)</span>`;

        const statusBadge = user.status === 'Active'
            ? `<span class="status-completed" style="cursor:pointer;" onclick="toggleUserStatus(${user.id}, 'Inactive')">Active</span>`
            : `<span class="status-out" style="cursor:pointer;" onclick="toggleUserStatus(${user.id}, 'Active')">Inactive</span>`;

        tbody.innerHTML += `
            <tr>
                <td>${user.name || 'N/A'}</td>
                <td>${user.email || 'N/A'}</td>
                <td>${user.phone || 'N/A'}</td>
                <td>${isAdminBadge}</td>
                <td>${statusBadge}</td>
                <td class="action-btns">
                    <button class="btn btn-danger" style="padding: 6px 12px; font-size: 12px;" onclick="deleteUser(${user.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// ============================================
// RENDER: PRODUCTS (with search + edit btn)
// ============================================
function renderProducts(filter = '') {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const q = filter.toLowerCase().trim();
    const filtered = q ? products.filter(p =>
        (p.name || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
    ) : products;

    filtered.forEach(p => {
        const isStockBadge = p.in_stock
            ? `<span class="status-available" style="cursor:pointer;" onclick="toggleStock(${p.id}, false)">Available</span>`
            : `<span class="status-out" style="cursor:pointer;" onclick="toggleStock(${p.id}, true)">Out of Stock</span>`;

        const tagsDisplay = (p.tags && Array.isArray(p.tags) && p.tags.length > 0)
            ? p.tags.map(t => `<span class="badge" style="background:rgba(139,92,246,0.15); color:#8b5cf6; padding:2px 6px; border-radius:4px; font-size:10px; margin-right:4px;">${t}</span>`).join('')
            : (p.tag ? `<span class="badge" style="background:rgba(139,92,246,0.15); color:#8b5cf6; padding:2px 6px; border-radius:4px; font-size:10px;">${p.tag}</span>` : '');

        tbody.innerHTML += `
            <tr>
                <td><img src="${p.img}" style="width:40px; height:40px; border-radius:8px; object-fit:cover;" onerror="this.src='https://placehold.co/40x40'"></td>
                <td>
                    <strong>${p.name}</strong><br>
                    <small style="color:var(--text-secondary)">Category: ${p.category} | Playback: ${p.playback || 'N/A'}</small><br>
                    ${tagsDisplay}
                </td>
                <td><del>₹${parseFloat(p.original_price || 0).toLocaleString()}</del> <br> <strong>₹${parseFloat(p.price || 0).toLocaleString()}</strong></td>
                <td>${p.discount || 0}% Off</td>
                <td>${isStockBadge}</td>
                <td class="action-btns">
                    <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;" onclick="editProduct(${p.id})">Edit</button>
                    <button class="btn btn-danger" style="padding: 6px 12px; font-size: 12px;" onclick="deleteProduct(${p.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// ============================================
// RENDER: CATEGORIES (with search + edit btn)
// ============================================
function renderCategories(filter = '') {
    const tbody = document.getElementById('categoriesTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const q = filter.toLowerCase().trim();
    const filtered = q ? categories.filter(c =>
        (c.name || '').toLowerCase().includes(q)
    ) : categories;

    filtered.forEach(c => {
        tbody.innerHTML += `
            <tr>
                <td style="width: 50px;"><ion-icon name="menu-outline" class="drag-handle"></ion-icon></td>
                <td><img src="${c.img}" style="width:40px; height:40px; border-radius:8px; object-fit:cover;" onerror="this.src='https://placehold.co/40x40'"></td>
                <td>${c.name}</td>
                <td>${c.count || 0}</td>
                <td class="action-btns">
                    <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;" onclick="editCategory(${c.id})">Edit</button>
                    <button class="btn btn-danger" style="padding: 6px 12px; font-size: 12px;" onclick="deleteCategory(${c.id})">Delete</button>
                </td>
            </tr>
        `;
    });

    // SortableJS
    if (typeof Sortable !== 'undefined') {
        new Sortable(tbody, { handle: '.drag-handle', animation: 150, ghostClass: 'sortable-ghost' });
    }
}

// ============================================
// RENDER: COUPONS (with search + edit btn)
// ============================================
function renderCoupons(filter = '') {
    const tbody = document.getElementById('couponsTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const q = filter.toLowerCase().trim();
    const filtered = q ? coupons.filter(c =>
        (c.code || '').toLowerCase().includes(q)
    ) : coupons;

    filtered.forEach(c => {
        tbody.innerHTML += `
            <tr>
                <td><strong>${c.code}</strong></td>
                <td>${c.discount}</td>
                <td>${c.expiry}</td>
                <td>${c.limit_count || 'Unlimited'}</td>
                <td><span class="status-completed">${c.status || 'Active'}</span></td>
                <td class="action-btns">
                    <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;" onclick="editCoupon(${c.id})">Edit</button>
                    <button class="btn btn-danger" style="padding: 6px 12px; font-size: 12px;" onclick="deleteCoupon(${c.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// ============================================
// RENDER: TAGS (with search + edit btn)
// ============================================
function renderTags(filter = '') {
    const tbody = document.getElementById('tagsTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const q = filter.toLowerCase().trim();
    const filtered = q ? tags.filter(t =>
        (t.name || '').toLowerCase().includes(q)
    ) : tags;

    filtered.forEach(t => {
        // Count products using this tag
        const usageCount = products.filter(p => {
            if (p.tags && Array.isArray(p.tags)) return p.tags.includes(t.name);
            if (p.tag) return p.tag.toLowerCase().includes(t.name.toLowerCase());
            return false;
        }).length;
        const dateStr = t.created_at ? new Date(t.created_at).toLocaleDateString() : 'N/A';

        tbody.innerHTML += `
            <tr>
                <td><strong>${t.name}</strong></td>
                <td>${usageCount}</td>
                <td>${dateStr}</td>
                <td class="action-btns">
                    <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;" onclick="editTag(${t.id})">Edit</button>
                    <button class="btn btn-danger" style="padding: 6px 12px; font-size: 12px;" onclick="deleteTag(${t.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// ============================================
// RENDER: BANNERS (with search)
// ============================================
function renderBanners(filter = '') {
    const tbody = document.getElementById('bannersTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const q = filter.toLowerCase().trim();
    const filtered = q ? banners.filter(b =>
        (b.category || '').toLowerCase().includes(q)
    ) : banners;

    filtered.forEach(b => {
        const catLabel = b.category ? `<span class="badge" style="background:#8b5cf6; color:#fff; padding:4px 8px; border-radius:4px;">${b.category}</span>` : '<em>None</em>';
        const dateStr = b.created_at ? new Date(b.created_at).toLocaleDateString() : 'N/A';

        tbody.innerHTML += `
            <tr>
                <td><img src="${b.img}" style="max-width:180px; max-height:60px; border-radius:4px; object-fit:cover;" onerror="this.src='https://placehold.co/180x60'"></td>
                <td>${catLabel}</td>
                <td>${dateStr}</td>
                <td class="action-btns">
                    <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;" onclick="editBanner(${b.id})">Edit</button>
                    <button class="btn btn-danger" style="padding: 6px 12px; font-size: 12px;" onclick="deleteBanner(${b.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function populateBannerCategorySelect() {
    const select = document.getElementById('bannerCategorySelect');
    if (!select) return;
    select.innerHTML = '<option value="">-- None (No Category Link) --</option>';
    categories.forEach(c => {
        select.innerHTML += `<option value="${c.name}">${c.name}</option>`;
    });
}

// ============================================
// RENDER: ORDERS (with search)
// ============================================
function renderOrders(filter = '') {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const q = filter.toLowerCase().trim();
    const filtered = q ? orders.filter(o =>
        String(o.id || '').toLowerCase().includes(q) ||
        (o.customer || '').toLowerCase().includes(q)
    ) : orders;

    filtered.forEach(o => {
        const dateStr = o.created_at ? new Date(o.created_at).toLocaleDateString() : 'N/A';
        const statusSelect = `
            <select style="padding:4px 8px; border-radius:4px; border:1px solid var(--border-color); font-size:12px; background:transparent; color: var(--text-primary);" onchange="updateOrderStatus('${o.id}', this.value)">
                <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
                <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
                <option value="Completed" ${o.status === 'Completed' ? 'selected' : ''}>Completed</option>
                <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
        `;
        tbody.innerHTML += `
            <tr>
                <td><strong>${o.id}</strong></td>
                <td>${o.customer || 'N/A'}</td>
                <td><small>${o.products || 'N/A'}</small></td>
                <td>₹${parseFloat(o.total || 0).toLocaleString()}</td>
                <td>${dateStr}</td>
                <td>${statusSelect}</td>
                <td class="action-btns">
                    <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;" onclick="viewOrder('${o.id}')">View</button>
                </td>
            </tr>
        `;
    });
}

// ============================================
// RENDER: PAYMENTS (with search)
// ============================================
function renderPayments(filter = '') {
    const tbody = document.getElementById('paymentsTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const q = filter.toLowerCase().trim();
    const filtered = q ? payments.filter(p =>
        (p.txn_id || '').toLowerCase().includes(q) ||
        (p.order_id || '').toLowerCase().includes(q)
    ) : payments;

    filtered.forEach(p => {
        const dateStr = p.created_at ? new Date(p.created_at).toLocaleDateString() : 'N/A';
        const statusClass = (p.status === 'Settled' || p.status === 'Success') ? 'status-completed' : 'status-pending';
        tbody.innerHTML += `
            <tr>
                <td><strong>${p.txn_id || 'N/A'}</strong></td>
                <td>${p.order_id || 'N/A'}</td>
                <td>${p.method || 'N/A'}</td>
                <td>₹${parseFloat(p.amount || 0).toLocaleString()}</td>
                <td>${dateStr}</td>
                <td><span class="${statusClass}">${p.status || 'N/A'}</span></td>
            </tr>
        `;
    });
}

// ============================================
// CATEGORY & TAGS SELECT FOR PRODUCT FORM
// ============================================
function populateProductCategorySelect() {
    const select = document.getElementById('productCategorySelect');
    if (!select) return;
    select.innerHTML = '<option value="">-- Select --</option>';
    categories.forEach(c => {
        select.innerHTML += `<option value="${c.name}">${c.name}</option>`;
    });
}

function populateProductTagsSelect(selectedTags = []) {
    const container = document.getElementById('productTagsSelect');
    if (!container) return;
    container.innerHTML = '';
    tags.forEach(t => {
        const checked = selectedTags.includes(t.name) ? 'checked' : '';
        container.innerHTML += `
            <label class="tag-checkbox">
                <input type="checkbox" value="${t.name}" ${checked} onchange="limitTagSelection()">
                <span>${t.name}</span>
            </label>
        `;
    });
}

window.limitTagSelection = function() {
    const container = document.getElementById('productTagsSelect');
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    const checked = container.querySelectorAll('input[type="checkbox"]:checked');
    if (checked.length >= 2) {
        checkboxes.forEach(cb => { if (!cb.checked) cb.disabled = true; });
    } else {
        checkboxes.forEach(cb => { cb.disabled = false; });
    }
};

function getSelectedTags() {
    const container = document.getElementById('productTagsSelect');
    if (!container) return [];
    return Array.from(container.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
}

// ============================================
// OPEN ADD (reset form + open modal)
// ============================================
window.openAddProduct = function() {
    editingProductId = null;
    document.getElementById('productModalTitle').innerText = 'Add Product';
    document.getElementById('addProductForm').reset();
    document.getElementById('editProductId').value = '';
    populateProductTagsSelect([]);
    openModal('productModal');
};

window.openAddCategory = function() {
    editingCategoryId = null;
    document.getElementById('categoryModalTitle').innerText = 'Add Category';
    document.getElementById('addCategoryForm').reset();
    document.getElementById('editCategoryId').value = '';
    openModal('categoryModal');
};

window.openAddCoupon = function() {
    editingCouponId = null;
    document.getElementById('couponModalTitle').innerText = 'Add Coupon';
    document.getElementById('addCouponForm').reset();
    document.getElementById('editCouponId').value = '';
    openModal('couponModal');
};

window.openAddTag = function() {
    editingTagId = null;
    document.getElementById('tagModalTitle').innerText = 'Add Tag';
    document.getElementById('addTagForm').reset();
    document.getElementById('editTagId').value = '';
    openModal('tagModal');
};

window.openAddBanner = function() {
    editingBannerId = null;
    document.getElementById('bannerModalTitle').innerText = 'Add Banner';
    document.getElementById('addBannerForm').reset();
    document.getElementById('editBannerId').value = '';
    openModal('bannerModal');
};

// ============================================
// EDIT HANDLERS — Pre-fill forms
// ============================================
window.editProduct = function(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    editingProductId = id;
    document.getElementById('productModalTitle').innerText = 'Edit Product';
    document.getElementById('editProductId').value = id;
    document.getElementById('pf_img').value = p.img || '';
    document.getElementById('pf_img2').value = p.img2 || '';
    document.getElementById('pf_img2').required = false; // not required when editing existing
    document.getElementById('pf_img3').value = p.img3 || '';
    document.getElementById('pf_img4').value = p.img4 || '';
    document.getElementById('pf_name').value = p.name || '';
    document.getElementById('productCategorySelect').value = p.category || '';
    const colorsVal = Array.isArray(p.colors) ? p.colors.join(', ') : (p.colors || '');
    document.getElementById('pf_colors').value = colorsVal;
    document.getElementById('pf_original_price').value = p.original_price || '';
    document.getElementById('pf_price').value = p.price || '';
    document.getElementById('pf_stock_qty').value = '';
    document.getElementById('pf_stock_status').value = p.in_stock ? 'Available' : 'Out of Stock';
    document.getElementById('pf_rating').value = p.rating || '';
    document.getElementById('pf_reviews').value = p.reviews || '';
    document.getElementById('pf_playback').value = p.playback || '';
    document.getElementById('pf_discount').value = p.discount || '';
    const featuresVal = Array.isArray(p.features) ? p.features.join(', ') : (p.features || '');
    document.getElementById('pf_features').value = featuresVal;
    document.getElementById('pf_description').value = p.description || '';

    // Tags
    const pTags = (p.tags && Array.isArray(p.tags)) ? p.tags : [];
    populateProductTagsSelect(pTags);

    openModal('productModal');
};

window.editCategory = function(id) {
    const c = categories.find(x => x.id === id);
    if (!c) return;
    editingCategoryId = id;
    document.getElementById('categoryModalTitle').innerText = 'Edit Category';
    document.getElementById('editCategoryId').value = id;
    document.getElementById('cf_img').value = c.img || '';
    document.getElementById('cf_name').value = c.name || '';
    openModal('categoryModal');
};

window.editCoupon = function(id) {
    const c = coupons.find(x => x.id === id);
    if (!c) return;
    editingCouponId = id;
    document.getElementById('couponModalTitle').innerText = 'Edit Coupon';
    document.getElementById('editCouponId').value = id;
    document.getElementById('cpf_code').value = c.code || '';
    document.getElementById('cpf_discount').value = c.discount || '';
    document.getElementById('cpf_expiry').value = c.expiry || '';
    document.getElementById('cpf_limit').value = c.limit_count === 'Unlimited' ? '' : (c.limit_count || '');
    openModal('couponModal');
};

window.editTag = function(id) {
    const t = tags.find(x => x.id === id);
    if (!t) return;
    editingTagId = id;
    document.getElementById('tagModalTitle').innerText = 'Edit Tag';
    document.getElementById('editTagId').value = id;
    document.getElementById('tf_name').value = t.name || '';
    openModal('tagModal');
};

window.editBanner = function(id) {
    const b = banners.find(x => x.id === id);
    if (!b) return;
    editingBannerId = id;
    document.getElementById('bannerModalTitle').innerText = 'Edit Banner';
    document.getElementById('editBannerId').value = id;
    document.getElementById('bf_img').value = b.img || '';
    document.getElementById('bannerCategorySelect').value = b.category || '';
    openModal('bannerModal');
};

// ============================================
// TOGGLE / ACTION HANDLERS
// ============================================
window.toggleAdmin = async function(id, is_admin) {
    const { error } = await db.from('users').update({ is_admin }).eq('id', id);
    if (!error) { users = await fetchTable('users'); renderUsers(); }
    else alert('Failed: ' + error.message);
};

window.toggleUserStatus = async function(id, status) {
    const { error } = await db.from('users').update({ status }).eq('id', id);
    if (!error) { users = await fetchTable('users'); renderUsers(); }
    else alert('Failed: ' + error.message);
};

window.toggleStock = async function(id, in_stock) {
    const { error } = await db.from('products').update({ in_stock }).eq('id', id);
    if (!error) { products = await fetchTable('products'); renderProducts(); }
    else alert('Failed: ' + error.message);
};

window.updateOrderStatus = async function(id, status) {
    const { error } = await db.from('orders').update({ status }).eq('id', id);
    if (!error) { orders = await fetchTable('orders'); renderOrders(); updateDashboardStats(); }
    else alert('Failed: ' + error.message);
};

window.viewOrder = function(id) {
    const o = orders.find(x => String(x.id) === String(id));
    if (o) {
        const dateStr = o.created_at ? new Date(o.created_at).toLocaleString() : 'N/A';
        document.getElementById('orderDetailsContent').innerHTML = `
            <div style="display:flex; flex-direction:column; gap:10px;">
                <div style="display:flex; justify-content:space-between;">
                  <p><strong>Order ID:</strong> ${o.id}</p>
                  ${o.status === 'Processing' ? `<button class="btn btn-outline" style="padding:4px 8px; font-size:12px;" onclick="downloadAdminInvoice('${o.id}')">Print Slip</button>` : ''}
                </div>
                <p><strong>Customer:</strong> ${o.customer}</p>
                <p><strong>Address:</strong> ${o.address || 'N/A'}</p>
                <p><strong>Payment Method:</strong> ${o.payment || 'N/A'}</p>
                <p><strong>Date & Time:</strong> ${dateStr}</p>
                <p><strong>Status:</strong> ${o.status}</p>
                <p><strong>Total:</strong> ₹${parseFloat(o.total || 0).toLocaleString()}</p>
                <div style="margin-top:15px; border-top:1px solid var(--border-color); padding-top:15px;">
                    <h4>Products</h4>
                    <p>${o.products || 'N/A'}</p>
                </div>
            </div>
        `;
        openModal('orderViewModal');
    }
};

window.downloadAdminInvoice = function(id) {
    const o = orders.find(x => String(x.id) === String(id));
    if (!o) return;
    const printWindow = window.open('', '_blank', 'width=600,height=800');
    printWindow.document.write(generatePackingSlipHTML([o]));
    printWindow.document.close();
};

window.downloadBulkInvoices = function() {
    const processingOrders = orders.filter(o => o.status === 'Processing');
    if (processingOrders.length === 0) {
        alert("No orders with 'Processing' status found.");
        return;
    }
    const printWindow = window.open('', '_blank', 'width=600,height=800');
    printWindow.document.write(generatePackingSlipHTML(processingOrders));
    printWindow.document.close();
};

window.generatePackingSlipHTML = function(orderList) {
    const slips = orderList.map(o => {
        const dateStr = o.created_at ? new Date(o.created_at).toLocaleDateString() : 'N/A';
        return `
            <div class="slip">
                <div class="header">
                    <h2 style="margin:0; font-size: 24px; text-transform: uppercase;">Auriom</h2>
                    <p style="margin: 4px 0 0; font-size: 12px; color: #555;">Packing Slip</p>
                </div>
                <div class="info-row">
                    <div>
                        <div class="label">Order ID</div>
                        <div class="value">#${o.id}</div>
                    </div>
                    <div style="text-align:right;">
                        <div class="label">Date</div>
                        <div class="value">${dateStr}</div>
                    </div>
                </div>
                <div class="ship-to">
                    <div class="label">Ship To:</div>
                    <div class="value" style="font-size: 14px; margin-top:4px;">
                        <strong>${o.customer}</strong><br>
                        ${(o.address || 'N/A').replace(/\\n/g, '<br>')}
                    </div>
                </div>
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>Item Details</th>
                            <th style="width: 50px; text-align: center;">Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${(o.products || '').split(', ').map(prod => {
                            const parts = prod.split('x ');
                            const count = parts[0] ? parts[0].trim() : '';
                            const name = parts[1] || prod;
                            return '<tr><td>' + name + '</td><td style="text-align: center;"><strong>' + count + '</strong></td></tr>';
                        }).join('')}
                    </tbody>
                </table>
                <div class="footer">
                    Thank you for shopping with Auriom!<br>
                    <small>support@auriom.in | www.auriom.in</small>
                </div>
            </div>
        `;
    }).join('');

    return `
      <html>
        <head>
          <title>Packing Slips</title>
          <style>
            @page { size: 4in 6in; margin: 0; }
            body { 
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
                margin: 0; 
                padding: 0; 
                background: #ccc;
            }
            .slip {
                width: 4in;
                height: 6in;
                padding: 0.2in;
                box-sizing: border-box;
                background: #fff;
                margin: 0 auto;
                page-break-after: always;
                display: flex;
                flex-direction: column;
                position: relative;
                overflow: hidden;
            }
            .slip:last-child {
                page-break-after: auto;
            }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px; }
            .label { font-size: 10px; color: #666; text-transform: uppercase; }
            .value { font-size: 12px; font-weight: bold; }
            .info-row { display: flex; justify-content: space-between; margin-bottom: 15px; }
            .ship-to { border: 1px solid #000; padding: 10px; border-radius: 4px; margin-bottom: 15px; }
            .items-table { width: 100%; border-collapse: collapse; margin-bottom: auto; }
            .items-table th { border-bottom: 2px solid #000; text-align: left; padding: 5px 0; font-size: 11px; text-transform: uppercase; }
            .items-table td { border-bottom: 1px solid #eee; padding: 8px 0; font-size: 12px; }
            .footer { text-align: center; border-top: 2px dashed #000; padding-top: 10px; margin-top: 15px; font-size: 12px; font-weight: bold; }
            @media print {
                body { background: #fff; }
                .slip { margin: 0; }
            }
          </style>
        </head>
        <body>
          ${slips}
          <script>
            window.onload = function() { setTimeout(() => { window.print(); }, 500); }
          </script>
        </body>
      </html>
    `;
};

// ============================================
// DELETE HANDLERS
// ============================================
window.deleteUser = async function(id) {
    if (!confirm('Delete this user?')) return;
    const { error } = await db.from('users').delete().eq('id', id);
    if (!error) { users = await fetchTable('users'); renderUsers(); updateDashboardStats(); }
    else alert('Failed: ' + error.message);
};

window.deleteProduct = async function(id) {
    if (!confirm('Delete this product?')) return;
    
    // Find product to delete its images from storage
    const p = products.find(x => x.id === id);
    if (p) {
        if (p.img) await deleteFileFromSupabase(p.img);
        if (p.img2) await deleteFileFromSupabase(p.img2);
        if (p.img3) await deleteFileFromSupabase(p.img3);
        if (p.img4) await deleteFileFromSupabase(p.img4);
    }

    const { error } = await db.from('products').delete().eq('id', id);
    if (!error) { products = await fetchTable('products'); renderProducts(); updateDashboardStats(); }
    else alert('Failed: ' + error.message);
};

window.deleteCategory = async function(id) {
    if (!confirm('Delete this category?')) return;

    // Find category to delete its image from storage
    const c = categories.find(x => x.id === id);
    if (c && c.img) {
        await deleteFileFromSupabase(c.img);
    }

    const { error } = await db.from('categories').delete().eq('id', id);
    if (!error) { categories = await fetchTable('categories'); renderCategories(); populateProductCategorySelect(); }
    else alert('Failed: ' + error.message);
};

window.deleteCoupon = async function(id) {
    if (!confirm('Delete this coupon?')) return;
    const { error } = await db.from('coupons').delete().eq('id', id);
    if (!error) { coupons = await fetchTable('coupons'); renderCoupons(); }
    else alert('Failed: ' + error.message);
};

window.deleteTag = async function(id) {
    if (!confirm('Delete this tag?')) return;
    const { error } = await db.from('tags').delete().eq('id', id);
    if (!error) { tags = await fetchTable('tags'); renderTags(); populateProductTagsSelect(); }
    else alert('Failed: ' + error.message);
};

window.deleteBanner = async function(id) {
    if (banners.length <= 1) {
        alert('Cannot delete the last banner. At least one banner is required.');
        return;
    }
    if (!confirm('Delete this banner?')) return;

    // Find banner to delete its image from storage
    const b = banners.find(x => x.id === id);
    if (b && b.img) {
        await deleteFileFromSupabase(b.img);
    }

    const { error } = await db.from('banners').delete().eq('id', id);
    if (!error) {
        banners = await fetchTable('banners');
        renderBanners();
    } else {
        alert('Failed: ' + error.message);
    }
};

// ============================================
// FORM SUBMISSIONS (Add/Edit)
// ============================================
function setupFormHandlers() {
    const calcDiscount = () => {
        const oldP = parseFloat(document.getElementById('pf_original_price').value);
        const newP = parseFloat(document.getElementById('pf_price').value);
        if (oldP && newP && oldP > newP) {
            const discount = Math.round(((oldP - newP) / oldP) * 100);
            document.getElementById('pf_discount').value = discount;
        } else {
            document.getElementById('pf_discount').value = '';
        }
    };
    document.getElementById('pf_original_price')?.addEventListener('input', calcDiscount);
    document.getElementById('pf_price')?.addEventListener('input', calcDiscount);

    // Add/Edit Product
    document.getElementById('addProductForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const colorsVal = document.getElementById('pf_colors').value.split(',').map(c => c.trim()).filter(c => c.length > 0);
        const featuresVal = document.getElementById('pf_features').value.split(',').map(f => f.trim()).filter(f => f.length > 0);
        const in_stock = document.getElementById('pf_stock_status').value === 'Available';
        const selectedTags = getSelectedTags();

        const productData = {
            img: document.getElementById('pf_img').value.trim(),
            img2: document.getElementById('pf_img2').value.trim() || null,
            img3: document.getElementById('pf_img3').value.trim() || null,
            img4: document.getElementById('pf_img4').value.trim() || null,
            name: document.getElementById('pf_name').value.trim(),
            category: document.getElementById('productCategorySelect').value,
            colors: colorsVal,
            original_price: parseFloat(document.getElementById('pf_original_price').value || 0).toString(),
            price: parseFloat(document.getElementById('pf_price').value || 0).toString(),
            in_stock,
            rating: parseFloat(document.getElementById('pf_rating').value || 4.5).toString(),
            reviews: parseInt(document.getElementById('pf_reviews').value || 0, 10),
            playback: document.getElementById('pf_playback').value.trim() || '',
            tag: selectedTags.join(', '),
            tags: selectedTags,
            discount: parseInt(document.getElementById('pf_discount').value || 0, 10),
            features: featuresVal,
            description: document.getElementById('pf_description').value.trim() || ''
        };

        let error;
        if (editingProductId) {
            // Smart cleanup safety net: delete old image files from storage if replaced
            const oldP = products.find(x => x.id === editingProductId);
            if (oldP) {
                if (oldP.img && oldP.img !== productData.img) await deleteFileFromSupabase(oldP.img);
                if (oldP.img2 && oldP.img2 !== productData.img2) await deleteFileFromSupabase(oldP.img2);
                if (oldP.img3 && oldP.img3 !== productData.img3) await deleteFileFromSupabase(oldP.img3);
                if (oldP.img4 && oldP.img4 !== productData.img4) await deleteFileFromSupabase(oldP.img4);
            }
            // Update existing
            ({ error } = await db.from('products').update(productData).eq('id', editingProductId));
        } else {
            // Insert new
            ({ error } = await db.from('products').insert([productData]));
        }

        if (!error) {
            products = await fetchTable('products');
            renderProducts();
            updateDashboardStats();
            closeModal('productModal');
            e.target.reset();
            editingProductId = null;
        } else {
            alert('Failed to save product: ' + error.message);
        }
    });

    // Add/Edit Category
    document.getElementById('addCategoryForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const catData = {
            img: document.getElementById('cf_img').value.trim(),
            name: document.getElementById('cf_name').value.trim(),
        };

        let error;
        if (editingCategoryId) {
            // Smart cleanup safety net: delete old category image from storage if replaced
            const oldC = categories.find(x => x.id === editingCategoryId);
            if (oldC && oldC.img && oldC.img !== catData.img) {
                await deleteFileFromSupabase(oldC.img);
            }
            ({ error } = await db.from('categories').update(catData).eq('id', editingCategoryId));
        } else {
            catData.count = 0;
            ({ error } = await db.from('categories').insert([catData]));
        }

        if (!error) {
            categories = await fetchTable('categories');
            renderCategories();
            populateProductCategorySelect();
            closeModal('categoryModal');
            e.target.reset();
            editingCategoryId = null;
        } else {
            alert('Failed to save category: ' + error.message);
        }
    });

    // Add/Edit Coupon
    document.getElementById('addCouponForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const couponData = {
            code: document.getElementById('cpf_code').value.trim().toUpperCase(),
            discount: document.getElementById('cpf_discount').value.trim(),
            expiry: document.getElementById('cpf_expiry').value,
            limit_count: document.getElementById('cpf_limit').value ? document.getElementById('cpf_limit').value.trim() : 'Unlimited',
            status: 'Active'
        };

        let error;
        if (editingCouponId) {
            ({ error } = await db.from('coupons').update(couponData).eq('id', editingCouponId));
        } else {
            ({ error } = await db.from('coupons').insert([couponData]));
        }

        if (!error) {
            coupons = await fetchTable('coupons');
            renderCoupons();
            closeModal('couponModal');
            e.target.reset();
            editingCouponId = null;
        } else {
            alert('Failed to save coupon: ' + error.message);
        }
    });

    // Add/Edit Tag
    document.getElementById('addTagForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const tagName = document.getElementById('tf_name').value.trim();
        if (!tagName) return;

        let error;
        if (editingTagId) {
            ({ error } = await db.from('tags').update({ name: tagName }).eq('id', editingTagId));
        } else {
            ({ error } = await db.from('tags').insert([{ name: tagName }]));
        }

        if (!error) {
            tags = await fetchTable('tags');
            renderTags();
            populateProductTagsSelect();
            closeModal('tagModal');
            e.target.reset();
            editingTagId = null;
        } else {
            alert('Failed to save tag: ' + error.message);
        }
    });

    // Add/Edit Banner
    document.getElementById('addBannerForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const bannerData = {
            img: document.getElementById('bf_img').value.trim(),
            category: document.getElementById('bannerCategorySelect').value || null
        };

        let error;
        if (editingBannerId) {
            // Smart cleanup safety net: delete old banner image from storage if replaced
            const oldB = banners.find(x => x.id === editingBannerId);
            if (oldB && oldB.img && oldB.img !== bannerData.img) {
                await deleteFileFromSupabase(oldB.img);
            }
            ({ error } = await db.from('banners').update(bannerData).eq('id', editingBannerId));
        } else {
            ({ error } = await db.from('banners').insert([bannerData]));
        }

        if (!error) {
            banners = await fetchTable('banners');
            renderBanners();
            closeModal('bannerModal');
            e.target.reset();
            editingBannerId = null;
        } else {
            alert('Failed to save banner: ' + error.message);
        }
    });

    // Add User (no edit for users)
    document.getElementById('addUserForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const inputs = e.target.querySelectorAll('input, select');

        const newUser = {
            name: inputs[0].value.trim(),
            email: inputs[1].value.trim(),
            phone: inputs[2].value ? inputs[2].value.trim() : '',
            password: inputs[3].value,
            is_admin: inputs[4].value === 'true',
            status: 'Active',
            addresses: []
        };

        // Check uniqueness
        const { data: existing } = await db.from('users').select('id').eq('email', newUser.email).maybeSingle();
        if (existing) {
            alert('A user with this email already exists!');
            return;
        }

        const { error } = await db.from('users').insert([newUser]);
        if (!error) {
            users = await fetchTable('users');
            renderUsers();
            updateDashboardStats();
            closeModal('userModal');
            e.target.reset();
        } else {
            alert('Failed to save user: ' + error.message);
        }
    });
}

// ============================================
// DASHBOARD STATS & CHARTS (REAL DATA)
// ============================================
function updateDashboardStats() {
    // Stat cards
    const setEl = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.innerText = val;
    };

    setEl('statTotalUsers', users.length);
    setEl('statTotalProducts', products.length);
    setEl('statTotalOrders', orders.length);

    // Revenue
    let revenue = 0;
    orders.forEach(o => {
        if (o.status === 'Completed' || o.status === 'Processing') {
            revenue += parseFloat(o.total || 0);
        }
    });
    setEl('statRevenue', '₹' + revenue.toLocaleString());

    // Payments
    let settledAmount = 0;
    let pendingAmount = 0;
    payments.forEach(p => {
        if (p.status === 'Settled' || p.status === 'Success') {
            settledAmount += parseFloat(p.amount || 0);
        } else {
            pendingAmount += parseFloat(p.amount || 0);
        }
    });
    setEl('statSuccessPayments', '₹' + settledAmount.toLocaleString());
    setEl('statPendingPayments', '₹' + pendingAmount.toLocaleString());

    // Charts
    updateCharts(revenue);
}

function updateCharts(revenueVal) {
    if (typeof Chart === 'undefined') return;

    // ---- 1. Revenue Chart (REAL monthly data from orders) ----
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyRev = new Array(12).fill(0);
    orders.forEach(o => {
        if ((o.status === 'Completed' || o.status === 'Processing') && o.created_at) {
            const d = new Date(o.created_at);
            if (d.getFullYear() === new Date().getFullYear()) {
                monthlyRev[d.getMonth()] += parseFloat(o.total || 0);
            }
        }
    });
    // Only show months up to current month
    const currentMonth = new Date().getMonth();
    const revLabels = monthNames.slice(0, currentMonth + 1);
    const revData = monthlyRev.slice(0, currentMonth + 1);

    const revCtx = document.getElementById('revenueChart');
    if (revCtx) {
        if (revenueChartInstance) revenueChartInstance.destroy();
        revenueChartInstance = new Chart(revCtx, {
            type: 'line',
            data: {
                labels: revLabels.length > 0 ? revLabels : ['No Data'],
                datasets: [{
                    label: 'Revenue (₹)',
                    data: revData.length > 0 ? revData : [0],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                plugins: { legend: { display: true } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    // ---- 2. Order Status Doughnut (REAL data) ----
    let completedCount = orders.filter(o => o.status === 'Completed').length;
    let pendingCount = orders.filter(o => o.status === 'Pending').length;
    let processingCount = orders.filter(o => o.status === 'Processing').length;
    let cancelledCount = orders.filter(o => o.status === 'Cancelled').length;
    let shippedCount = orders.filter(o => o.status === 'Shipped').length;

    const orderCtx = document.getElementById('orderStatusChart');
    if (orderCtx) {
        if (orderStatusChartInstance) orderStatusChartInstance.destroy();
        const hasOrders = (completedCount + pendingCount + processingCount + cancelledCount + shippedCount) > 0;
        orderStatusChartInstance = new Chart(orderCtx, {
            type: 'doughnut',
            data: {
                labels: hasOrders ? ['Completed', 'Pending', 'Processing', 'Cancelled', 'Shipped'] : ['No Orders Yet'],
                datasets: [{
                    data: hasOrders ? [completedCount, pendingCount, processingCount, cancelledCount, shippedCount] : [1],
                    backgroundColor: hasOrders ? ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6'] : ['#e2e8f0'],
                    borderWidth: 0
                }]
            },
            options: {
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    // ---- 3. Sales Comparison (REAL quarterly data) ----
    const quarterlyData = [0, 0, 0, 0];
    orders.forEach(o => {
        if ((o.status === 'Completed' || o.status === 'Processing') && o.created_at) {
            const d = new Date(o.created_at);
            if (d.getFullYear() === new Date().getFullYear()) {
                const quarter = Math.floor(d.getMonth() / 3);
                quarterlyData[quarter] += parseFloat(o.total || 0);
            }
        }
    });

    const salesCompCtx = document.getElementById('salesComparisonChart');
    if (salesCompCtx) {
        if (salesComparisonChartInstance) salesComparisonChartInstance.destroy();
        salesComparisonChartInstance = new Chart(salesCompCtx, {
            type: 'bar',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: `${new Date().getFullYear()} Sales`,
                    data: quarterlyData,
                    backgroundColor: '#8b5cf6'
                }]
            },
            options: {
                plugins: { legend: { display: true } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    // ---- 4. Category Sales (REAL product counts per category) ----
    const catMap = {};
    products.forEach(p => {
        const cat = p.category || 'Uncategorized';
        catMap[cat] = (catMap[cat] || 0) + 1;
    });
    const catLabels = Object.keys(catMap);
    const catData = Object.values(catMap);
    const catColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#6366f1', '#14b8a6', '#f97316'];

    const catSalesCtx = document.getElementById('categorySalesChart');
    if (catSalesCtx) {
        if (categorySalesChartInstance) categorySalesChartInstance.destroy();
        categorySalesChartInstance = new Chart(catSalesCtx, {
            type: 'polarArea',
            data: {
                labels: catLabels.length > 0 ? catLabels : ['No Products'],
                datasets: [{
                    data: catData.length > 0 ? catData : [0],
                    backgroundColor: catColors.slice(0, Math.max(1, catLabels.length)),
                    borderWidth: 0
                }]
            },
            options: {
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    // ---- 5. Top Products (REAL data by reviews) ----
    const sortedProducts = [...products].sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0)).slice(0, 5);
    const topLabels = sortedProducts.map(p => (p.name || '').substring(0, 20));
    const topData = sortedProducts.map(p => p.reviews ?? 0);

    const topProdCtx = document.getElementById('topProductsChart');
    if (topProdCtx) {
        if (topProductsChartInstance) topProductsChartInstance.destroy();
        topProductsChartInstance = new Chart(topProdCtx, {
            type: 'bar',
            data: {
                labels: topLabels.length > 0 ? topLabels : ['No Products'],
                datasets: [{
                    label: 'Popularity (Reviews)',
                    data: topData.length > 0 ? topData : [0],
                    backgroundColor: '#3b82f6'
                }]
            },
            options: {
                indexAxis: 'y',
                plugins: { legend: { display: false } },
                scales: { x: { beginAtZero: true } }
            }
        });
    }
}
