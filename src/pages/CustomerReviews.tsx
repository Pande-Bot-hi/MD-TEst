import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Image as ImageIcon, ChevronLeft, ChevronRight, Home, X, Lock } from 'lucide-react';
import { supabase, CustomerReview } from '../lib/supabase';

export default function CustomerReviews() {
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = reviews.length; 
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Search state
  const [searchType, setSearchType] = useState('title');
  const [searchQuery, setSearchQuery] = useState('');

  // UI States
  const [selectedReview, setSelectedReview] = useState<CustomerReview | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Lock States
  const [lockedReviewAttempt, setLockedReviewAttempt] = useState<CustomerReview | null>(null);
  const [unlockPasswordInput, setUnlockPasswordInput] = useState('');

  // Form States
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewPassword, setNewReviewPassword] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewContent, setNewReviewContent] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      if (data && data.length > 0) setReviews(data as CustomerReview[]);
      else setReviews([]);
    } catch (err) {
      console.error('Supabase fetch error:', err);
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  };

  const handleReviewClick = (review: CustomerReview) => {
    if (review.password && review.password.trim() !== '') {
      setLockedReviewAttempt(review);
      setUnlockPasswordInput('');
    } else {
      setSelectedReview(review);
    }
  };

  const handleUnlockSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (lockedReviewAttempt && unlockPasswordInput === lockedReviewAttempt.password) {
      setSelectedReview(lockedReviewAttempt);
      setLockedReviewAttempt(null);
      setUnlockPasswordInput('');
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleWriteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('reviews')
        .insert([
          {
            title: newReviewTitle,
            author_name: newReviewAuthor,
            content: newReviewContent,
            password: newReviewPassword // Optional column depending on input
          }
        ]);

      if (error) throw error;

      alert('작성된 글이 성공적으로 등록되었습니다.');
      setIsWriteModalOpen(false);
      
      // Reset form
      setNewReviewAuthor('');
      setNewReviewPassword('');
      setNewReviewTitle('');
      setNewReviewContent('');
      
      // Reload list
      fetchReviews();

    } catch (err: any) {
      console.error('Insert error:', err);
      alert('등록 중 오류가 발생했습니다: ' + err.message);
    }
  };

  // Pagination logic
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const currentReviews = reviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const renderPagination = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (endPage - startPage < 4) {
      if (startPage === 1) endPage = Math.min(totalPages, 5);
      else if (endPage === totalPages) startPage = Math.max(1, totalPages - 4);
    }

    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

    return (
      <div className="flex items-center justify-center gap-1 md:gap-2 mt-12 mb-8 text-sm text-[#555]">
        <button onClick={() => paginate(1)} disabled={currentPage === 1} className="p-1 md:p-2 hover:text-[#1f3f68] disabled:opacity-30 transition-colors hidden sm:flex items-center">
          <span className="text-xs">처음</span>
        </button>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="p-1 md:p-2 hover:text-[#1f3f68] disabled:opacity-30 transition-colors flex items-center">
          <ChevronLeft size={16} />
        </button>

        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-all ${
              currentPage === number ? 'bg-[#1f3f68] text-white font-bold shadow-md' : 'hover:bg-[#f0f4f8] hover:text-[#1f3f68]'
            }`}
          >
            {number}
          </button>
        ))}

        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="p-1 md:p-2 hover:text-[#1f3f68] disabled:opacity-30 transition-colors flex items-center">
          <ChevronRight size={16} />
        </button>
        <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} className="p-1 md:p-2 hover:text-[#1f3f68] disabled:opacity-30 transition-colors hidden sm:flex items-center">
          <span className="text-xs">마지막</span>
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-[#333] font-sans flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100 py-5 px-4 md:px-8 bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="text-2xl md:text-3xl font-serif font-bold italic text-[#1f3f68] group-hover:opacity-80 transition-opacity">MD</div>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm text-[#666] hover:text-[#1f3f68] transition-colors">
            <Home size={16} />
            <span>홈으로 돌아가기</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 py-10 md:py-16">
        
        {/* Title Section */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1f3f68] mb-4">고객 이용후기</h1>
          <p className="text-[#666] font-light text-sm md:text-base">
            MD 탐정사무소를 이용하신 고객님들의 생생한 후기입니다.
          </p>
        </div>

        {selectedReview ? (
          /* ================= Detail View ================= */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="border-t-[2px] border-[#1f3f68]">
              {/* Detail Header */}
              <div className="py-6 px-4 md:px-6 bg-[#f8fafc] border-b border-gray-200">
                <h2 className="text-xl md:text-2xl font-bold text-[#222] mb-4">
                  {selectedReview.password && <Lock size={18} className="inline mr-2 text-gray-400 mb-1" />}
                  {selectedReview.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#666]">
                  <div className="flex bg-white px-3 py-1 rounded border border-gray-200">
                    <span className="font-semibold text-[#444] mr-2">작성자</span>
                    {selectedReview.author_name}
                  </div>
                  <div className="flex bg-white px-3 py-1 rounded border border-gray-200">
                    <span className="font-semibold text-[#444] mr-2">작성일</span>
                    {formatDate(selectedReview.created_at)}
                  </div>
                  <div className="flex bg-white px-3 py-1 rounded border border-gray-200">
                    <span className="font-semibold text-[#444] mr-2">조회수</span>
                    {selectedReview.view_count}
                  </div>
                </div>
              </div>
              
              {/* Detail Body */}
              <div className="min-h-[300px] py-12 px-6 text-base text-[#444] leading-relaxed whitespace-pre-wrap">
                {selectedReview.content}
              </div>
              <div className="border-t border-gray-200"></div>
            </div>

            {/* Back Button */}
            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setSelectedReview(null)}
                className="bg-[#555] text-white px-8 py-3 rounded text-sm font-semibold hover:bg-black transition-colors shadow-sm"
              >
                목록으로
              </button>
            </div>
          </div>
        ) : (
          /* ================= List View ================= */
          <div className="animate-in fade-in duration-500">
            {/* Board Table */}
            <div className="border-t-[2px] border-[#1f3f68]">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-[80px_1fr_80px_120px_80px_120px] gap-4 py-4 px-4 bg-[#f8fafc] border-b border-gray-200 text-sm font-semibold text-[#444] text-center">
                <div>번호</div>
                <div>제목</div>
                <div>첨부</div>
                <div>이름</div>
                <div>조회수</div>
                <div>날짜</div>
              </div>

              {/* Table Body */}
              {isLoading ? (
                <div className="min-h-[560px]"></div>
              ) : currentReviews.length === 0 ? (
                <div className="min-h-[560px] flex items-center justify-center text-[#888]">등록된 게시글이 없습니다.</div>
              ) : (
                <div className="divide-y divide-gray-100 min-h-[560px]">
                  {currentReviews.map((review) => (
                    <div 
                      key={review.id} 
                      onClick={() => handleReviewClick(review)}
                      className="group hover:bg-[#f8fafc] transition-colors cursor-pointer py-4 px-4"
                    >
                      {/* Desktop View */}
                      <div className="hidden md:grid grid-cols-[80px_1fr_80px_120px_80px_120px] gap-4 items-center text-sm text-[#555] text-center">
                        <div className="font-mono text-[#888]">{review.is_pinned ? <span className="bg-[#1f3f68] text-white text-[10px] px-2 py-1 rounded">공지</span> : review.id}</div>
                        <div className="text-left font-medium text-[#222] truncate pr-4 group-hover:text-[#1f3f68] transition-colors flex items-center">
                          {review.password && review.password.trim() !== '' && <Lock size={12} className="inline mr-1.5 flex-shrink-0 text-gray-400" />}
                          <span className="truncate">{review.title}</span>
                        </div>
                        <div className="flex justify-center text-[#aaa]">
                          {review.has_attachment && <ImageIcon size={16} />}
                        </div>
                        <div>{review.author_name}</div>
                        <div className="font-mono">{review.view_count}</div>
                        <div className="font-mono text-[#888]">{formatDate(review.created_at)}</div>
                      </div>

                      {/* Mobile View */}
                      <div className="md:hidden flex flex-col gap-2">
                        <div className="flex items-start gap-2">
                          {review.is_pinned && <span className="flex-shrink-0 bg-[#1f3f68] text-white text-[10px] px-2 py-0.5 rounded mt-0.5">공지</span>}
                          <h3 className="font-medium text-[#222] leading-tight line-clamp-2 group-hover:text-[#1f3f68] transition-colors">
                            {review.password && review.password.trim() !== '' && <Lock size={12} className="inline mr-1.5 flex-shrink-0 text-gray-400" />}
                            {review.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[#888]">
                          <span>{review.author_name}</span>
                          <span className="w-[1px] h-3 bg-gray-200"></span>
                          <span>{formatDate(review.created_at)}</span>
                          {review.has_attachment && (
                            <>
                              <span className="w-[1px] h-3 bg-gray-200"></span>
                              <ImageIcon size={13} className="text-[#aaa]" />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="border-b border-gray-200"></div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col items-center mt-6 relative">
              {/* Pagination */}
              {renderPagination()}

              {/* Search Bar */}
              <div className="flex w-full md:w-auto max-w-lg mb-8 md:mb-0">
                <div className="flex w-full border border-gray-300 rounded overflow-hidden focus-within:border-[#1f3f68] focus-within:ring-1 focus-within:ring-[#1f3f68] transition-all">
                  <select 
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="bg-[#f8fafc] border-r border-gray-300 px-3 py-2 text-sm text-[#555] outline-none cursor-pointer"
                  >
                    <option value="title">제목</option>
                    <option value="content">내용</option>
                    <option value="author">이름</option>
                  </select>
                  <input 
                    type="text" 
                    placeholder="검색어를 입력하세요." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-2 text-sm outline-none"
                  />
                  <button className="bg-[#1f3f68] text-white px-5 py-2 text-sm font-medium hover:bg-[#152e4d] transition-colors flex items-center gap-1">
                    <Search size={16} />
                    <span className="hidden sm:inline">검색</span>
                  </button>
                </div>
                <button className="ml-2 bg-[#555] text-white px-4 py-2 text-sm font-medium rounded hover:bg-[#444] transition-colors whitespace-nowrap">
                  전체목록
                </button>
              </div>

              {/* Write Button */}
              <div className="w-full flex justify-end md:absolute md:right-0 md:bottom-0">
                <button 
                  onClick={() => setIsWriteModalOpen(true)}
                  className="bg-[#444] text-white px-6 py-2.5 rounded text-sm font-semibold hover:bg-[#1f3f68] transition-colors shadow-sm"
                >
                  글쓰기
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Unlock Password Modal */}
      {lockedReviewAttempt && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-lg shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-[#f8fafc]">
              <h3 className="text-lg font-bold text-[#1f3f68] flex items-center gap-2">
                <Lock size={18} />
                비밀글입니다
              </h3>
              <button 
                onClick={() => { setLockedReviewAttempt(null); setUnlockPasswordInput(''); }}
                className="text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleUnlockSubmit} className="p-6 flex flex-col gap-5">
              <p className="text-sm text-[#666]">
                이 글은 작성자가 보호 처리한 비밀글입니다.<br />
                확인을 위해 비밀번호를 입력해 주세요.
              </p>
              
              <div className="flex flex-col gap-2 relative">
                <div className="relative">
                  <input 
                    type="password" 
                    required 
                    autoFocus
                    value={unlockPasswordInput}
                    onChange={(e) => setUnlockPasswordInput(e.target.value)}
                    placeholder="비밀번호 입력"
                    className="w-full border border-gray-300 rounded pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#1f3f68] focus:ring-1 focus:ring-[#1f3f68] transition-all"
                  />
                  <Lock size={16} className="absolute left-3.5 top-[11px] text-gray-400" />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-[#1f3f68] text-white rounded text-sm font-medium hover:bg-[#152e4d] transition-colors shadow-sm"
              >
                확인
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Write Post Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-[#f8fafc]">
              <h3 className="text-xl font-bold text-[#1f3f68]">이용후기 작성</h3>
              <button 
                onClick={() => setIsWriteModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleWriteSubmit} className="p-6 md:p-8 flex flex-col gap-5 overflow-y-auto max-h-[80vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#444]">작성자 <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    required 
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="이름을 입력하세요"
                    className="border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#1f3f68] focus:ring-1 focus:ring-[#1f3f68] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2 relative">
                  <label className="text-sm font-semibold text-[#444]">비밀번호 <span className="text-gray-400 font-normal">(선택)</span></label>
                  <div className="relative">
                    <input 
                      type="password" 
                      value={newReviewPassword}
                      onChange={(e) => setNewReviewPassword(e.target.value)}
                      placeholder="입력 시 비밀글로 보호됩니다"
                      className="w-full border border-gray-300 rounded pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#1f3f68] focus:ring-1 focus:ring-[#1f3f68] transition-all"
                    />
                    <Lock size={16} className="absolute left-3.5 top-[11px] text-[#888]" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#444]">제목 <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required 
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="제목을 입력하세요"
                  className="border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#1f3f68] focus:ring-1 focus:ring-[#1f3f68] transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#444]">상세내용 <span className="text-red-500">*</span></label>
                <textarea 
                  required 
                  rows={8}
                  value={newReviewContent}
                  onChange={(e) => setNewReviewContent(e.target.value)}
                  placeholder="이용하신 후기를 자유롭게 남겨주세요."
                  className="border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1f3f68] focus:ring-1 focus:ring-[#1f3f68] transition-all resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-6 py-2.5 border border-gray-300 text-[#555] rounded text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button 
                  type="submit"
                  className="px-8 py-2.5 bg-[#1f3f68] text-white rounded text-sm font-medium hover:bg-[#152e4d] transition-colors shadow-sm"
                >
                  등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="mt-auto py-8 text-center text-xs text-[#888] border-t border-gray-100">
        &copy; {new Date().getFullYear()} MD Investigation. All rights reserved.
      </footer>
    </div>
  );
}
