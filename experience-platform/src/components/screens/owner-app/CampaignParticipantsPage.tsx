const CampaignParticipantsPage = () => {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">캠페인별 참여자 확인</h1>
        <p className="text-gray-600 mb-8">전체 신청자, 완료자, 미작성자 확인</p>
        
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🚧</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">구현 예정</h3>
          <p className="text-gray-600">
            이 화면은 곧 구현될 예정입니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignParticipantsPage;
