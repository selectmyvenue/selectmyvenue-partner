(function(){
  const MQ='(max-width:760px)';
  const root=document.documentElement;
  const byId=id=>document.getElementById(id);
  const isPhone=()=>matchMedia(MQ).matches;

  function labels(){
    const table=document.querySelector('.section table');
    const body=byId('enquiriesBody');
    if(!table||!body)return;
    const heads=[...table.querySelectorAll('thead th')].map(x=>(x.textContent||'').trim());
    [...body.querySelectorAll(':scope>tr')].forEach(row=>{
      const cells=[...row.children];
      if(cells.length===1)return;
      cells.forEach((cell,i)=>cell.dataset.partnerLabel=heads[i]||'');
    });
  }

  function ensureNav(){
    let nav=byId('partnerMobileNav');
    if(!nav){
      nav=document.createElement('nav');
      nav.id='partnerMobileNav';
      nav.className='partner-mobile-nav';
      nav.innerHTML=
        '<button type="button" data-partner-nav="leads" class="active"><span>☷</span><b>Leads</b></button>'+
        '<button type="button" data-partner-nav="filters"><span>⌕</span><b>Filters</b></button>'+
        '<button type="button" data-partner-nav="analytics"><span>▦</span><b>Analytics</b></button>'+
        '<button type="button" data-partner-nav="more"><span>•••</span><b>More</b></button>';
      document.body.appendChild(nav);
    }
    let menu=byId('partnerMobileMore');
    if(!menu){
      menu=document.createElement('div');
      menu.id='partnerMobileMore';
      menu.className='partner-mobile-more';
      menu.hidden=true;
      menu.innerHTML=
        '<button type="button" data-partner-more="venue">🏨 Your venue</button>'+
        '<button type="button" data-partner-more="alerts">🔔 Notifications</button>'+
        '<button type="button" data-partner-more="refresh">↻ Refresh leads</button>'+
        '<button type="button" data-partner-more="password">🔐 Change password</button>'+
        '<button type="button" data-partner-more="logout" class="danger">↪ Logout</button>';
      document.body.appendChild(menu);
    }
  }

  function closeMore(){const m=byId('partnerMobileMore');if(m)m.hidden=true;}

  function bind(){
    if(root.dataset.partnerPhoneBound==='1')return;
    root.dataset.partnerPhoneBound='1';
    document.addEventListener('click',e=>{
      const n=e.target.closest('[data-partner-nav]');
      if(n){
        const a=n.dataset.partnerNav;
        if(a==='leads'){
          document.body.classList.remove('partner-phone-filters-open');
          closeMore();
          document.querySelector('.section')?.scrollIntoView({behavior:'smooth',block:'start'});
        }
        if(a==='filters'){
          document.body.classList.toggle('partner-phone-filters-open');
          closeMore();
          setTimeout(()=>document.querySelector('.lead-workspace')?.scrollIntoView({behavior:'smooth',block:'start'}),30);
        }
        if(a==='analytics'){
          closeMore();
          window.smvOpenPartnerAnalytics?.();
        }
        if(a==='more'){
          const m=byId('partnerMobileMore');if(m)m.hidden=!m.hidden;
        }
        return;
      }
      const m=e.target.closest('[data-partner-more]');
      if(m){
        const a=m.dataset.partnerMore;
        if(a==='venue')document.querySelector('.venue-card')?.scrollIntoView({behavior:'smooth',block:'start'});
        if(a==='alerts')byId('notificationButton')?.click();
        if(a==='refresh')byId('refreshButton')?.click();
        if(a==='password')byId('changePasswordButton')?.click();
        if(a==='logout')byId('logoutButton')?.click();
        closeMore();
      }
    });
  }

  function observe(){
    const body=byId('enquiriesBody');
    if(body&&body.dataset.partnerPhoneWatch!=='1'){
      body.dataset.partnerPhoneWatch='1';
      new MutationObserver(()=>requestAnimationFrame(labels)).observe(body,{childList:true,subtree:true});
    }
  }

  function install(){
    root.classList.toggle('partner-phone-crm',isPhone());
    ensureNav();
    labels();
    bind();
    observe();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
  const mq=matchMedia(MQ);
  const sync=()=>root.classList.toggle('partner-phone-crm',mq.matches);
  if(mq.addEventListener)mq.addEventListener('change',sync);else mq.addListener(sync);
})();