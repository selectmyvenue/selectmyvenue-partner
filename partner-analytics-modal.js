(function(){
  const byId=id=>document.getElementById(id);
  function openAnalytics(){
    const modal=byId('partnerAnalyticsModal');
    if(!modal)return;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  }
  function closeAnalytics(){
    const modal=byId('partnerAnalyticsModal');
    if(!modal)return;
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  }
  function bind(){
    byId('partnerAnalyticsButton')?.addEventListener('click',openAnalytics);
    byId('partnerAnalyticsClose')?.addEventListener('click',closeAnalytics);
    byId('partnerAnalyticsModal')?.addEventListener('click',e=>{
      if(e.target===byId('partnerAnalyticsModal'))closeAnalytics();
    });
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&byId('partnerAnalyticsModal')?.getAttribute('aria-hidden')==='false')closeAnalytics();
    });
    window.smvOpenPartnerAnalytics=openAnalytics;
    window.smvClosePartnerAnalytics=closeAnalytics;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();