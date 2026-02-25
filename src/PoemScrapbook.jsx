import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const spreads = [
    {
        id: 0,
        elements: [
            { id: 'flower', src: '/assets/flower.png', type: 'draggable', x: '15%', y: '18%', width: '12%', rotation: -10 },
            { id: 'playlist', src: '/assets/love_playlist_static.png', type: 'static', x: '32%', y: '45%', width: '30%', rotation: 0 },
            { id: 'main_text', src: '/assets/main_note_text.png', type: 'draggable', x: '15%', y: '70%', width: '32%', rotation: 0 },
            { id: 'lips', src: '/assets/lips.png', type: 'draggable', x: '35%', y: '88%', width: '10%', rotation: 10 },
            {
                id: 'photo1',
                src: '/assets/photo_1_poem.png',
                type: 'photo_poem',
                x: '52%',
                y: '25%',
                width: '23%',
                rotation: -5,
                title: "Poema 20",
                author: "Pablo Neruda",
                poemLeft: [
                    "I can write the saddest verses of all tonight.",
                    "Write, for instance: \"The night is full of stars,",
                    "and the stars, blue, shiver in the distance.\"",
                    "The night wind whirls in the sky and sings.",
                    "I can write the saddest verses of all tonight.",
                    "I loved her, and sometimes she loved me too.",
                    "On nights like this, I held her in my arms.",
                    "I kissed her so many times under the infinite sky.",
                    "She loved me, sometimes I loved her.",
                    "How could I not have loved her large, still eyes?",
                    "I can write the saddest poem of all tonight.",
                    "To think I don't have her. To feel that I've lost her.",
                    "To hear the immense night, more immense without her.",
                    "And the poem falls to the soul as dew to grass.",
                    "What does it matter that my love couldn't keep her.",
                    "The night is full of stars and she is not with me.",
                    "That's all. Far away, someone sings. Far away.",
                    "My soul is lost without her."
                ],
                poemRight: [
                    "As if to bring her near, my eyes search for her.",
                    "My heart searches for her and she is not with me.",
                    "The same night that whitens the same trees.",
                    "We, we who were, we are the same no longer.",
                    "I no longer love her, true, but how much I loved her.",
                    "My voice searched the wind to touch her ear.",
                    "Someone else's. She will be someone else's. As she once",
                    "belonged to my kisses.",
                    "Her voice, her light body. Her infinite eyes.",
                    "I no longer love her, true, but perhaps I love her.",
                    "Love is so short and oblivion so long.",
                    "Because on nights like this I held her in my arms,",
                    "my soul is lost without her.",
                    "Although this may be the last pain she causes me,",
                    "and these may be the last verses I write for her."
                ]
            },
            {
                id: 'photo2',
                src: '/assets/photo_2_poem.png',
                type: 'photo_poem',
                x: '70%',
                y: '50%',
                width: '18%',
                rotation: 5,
                title: "Em và anh chỉ là hai tiếng vang...",
                author: "Marina Svetaeva",
                poemLeft: [
                    "Em và anh chỉ là hai tiếng vang",
                    "Anh người đi, còn em thì im lặng.",
                    "Có một thuở ta đã từng ngoan ngoãn",
                    "Nghe theo điệu bất hạnh của hào quang.",
                    "",
                    "Tình cảm này bằng con bệnh ngọt ngào",
                    "Đốt lòng ta và làm cho đau đớn",
                    "Chính vì thế em coi anh là bạn",
                    "Em lúc này không khóc được nữa đâu."
                ],
                poemRight: [
                    "Nỗi đắng cay sắp tới thành nụ cười",
                    "Và buồn đau sẽ trở nên mệt mỏi.",
                    "Không mắt nhìn mà cũng không lời nói",
                    "Chỉ thấy thương bí ẩn đã mất rồi!",
                    "",
                    "Chính từ anh, nhà giải phẫu rã rời",
                    "Cái điều ác ngọt ngào em nhận thấy.",
                    "Em coi anh như người anh trai vậy",
                    "Lúc này em không khóc được nữa rồi."
                ]
            },
            { id: 'fav', src: '/assets/fav_person.png', type: 'draggable', x: '75%', y: '17%', width: '15%', rotation: 8 },
            { id: 'note2', src: '/assets/note_2_static.png', type: 'static', x: '80%', y: '78%', width: '14%', rotation: -15 },
            { id: 'heart', src: '/assets/heart_letter.png', type: 'draggable', x: '55%', y: '80%', width: '14%', rotation: 10 },
            { id: 'note1', src: '/assets/note_1_static.png', type: 'static', x: '32%', y: '20%', width: '12%', rotation: 0 },
        ]
    },
    {
        id: 1,
        elements: [
            {
                id: 'photo3', src: '/assets/photo_3.png', type: 'photo_poem', x: '14%', y: '10%', width: '20%', rotation: -3,
                title: "Của em", author: "Thanh Tâm Tuyền",
                poemLeft: [
                    "Cửa sổ trời những mắt chưa quen",
                    "trán hoang đồng cỏ",
                    "run đường mỗi kỷ niệm",
                    "đi qua những thành phố đầy tim",
                    "cười đỏ mưa một mình",
                    "",
                    "trái tim ngọn lửa xanh",
                    "áo mùa đông"
                ],
                poemRight: [
                    "ngón tay út ngây thơ nền vải",
                    "buổi chiều",
                    "quá lạnh những hàng chấn song",
                    "đã yêu nhau muôn vàn mái nhà",
                    "những người vô tội chối từ khí giới",
                    "chấp hai lòng tay lò sưởi",
                    "không nỡ làm rối mi mắt khép",
                    "gửi một tiếng cười vào mùa thu",
                    "và một lá thư học trò"
                ]
            },
            {
                id: 'photo4', src: '/assets/photo_4.png', type: 'photo_poem', x: '30%', y: '42%', width: '18%', rotation: 6,
                title: "Chúng ta là thời gian", author: "Jorge Luis Borges",
                poemLeft: [
                    "Chúng ta là thời gian.",
                    "Chúng ta là ẩn dụ nổi tiếng",
                    "của Herclitus, nhà triết học u tối",
                    "",
                    "Chúng ta là nước, chúng ta không phải kim cương",
                    "Chúng ta sẽ mất đi, chúng ta không đứng lại.",
                    "",
                    "Chúng ta là sông và chúng ta là gã Hy Lạp ngắm mình",
                    "trên sông.",
                    "Bóng gã biến thành làn nước trong tấm gương đang thay đổi",
                    "Biến thành pha lê và pha lê đổi thay như lửa."
                ],
                poemRight: [
                    "Chúng ta là dòng sông tiên định phù phiếm",
                    "Trên hành trình ra tới biển.",
                    "",
                    "Những bóng tối bao quanh dòng sông.",
                    "Mọi thứ đều vinh biệt, mọi thứ đều vĩnh quyết ra đi.",
                    "",
                    "Ký ức không lưu lại dấu ấn của mình.",
                    "",
                    "Thế nhưng, vẫn còn điều gì ở lại",
                    "Thế nhưng, vẫn còn điều gì thở than"
                ]
            },
            {
                id: 'photo5', src: '/assets/photo_5.png', type: 'photo_poem', x: '52%', y: '40%', width: '22%', rotation: -5,
                title: "Và Ngược Lại", author: "Mario Benedetti",
                poemLeft: [
                    "Anh sợ phải gặp em",
                    "anh cần phải gặp em",
                    "anh mong được gặp em",
                    "anh thất vọng khi gặp em",
                    "anh muốn được gặp em",
                    "anh chỉ lo đến chuyện gặp em",
                    "anh chắc chắn sẽ gặp em",
                    "anh không nghi ngờ gì là sẽ gặp em",
                    "anh rất muốn được nghe giọng em",
                    "anh rất vui được nghe giọng em"
                ],
                poemRight: [
                    "anh thấy rất may mắn khi được nghe giọng em",
                    "và sợ hãi khi nghe giọng em",
                    "nói tóm lại là",
                    "anh rối bời",
                    "và anh rạng rỡ",
                    "có lẽ rối bời",
                    "nhiều hơn rạng rỡ",
                    "hay cũng là",
                    "ngược lại."
                ]
            },
            {
                id: 'photo6', src: '/assets/photo_6.png', type: 'photo_poem', x: '70%', y: '20%', width: '18%', rotation: 10,
                title: "Bão tuyết khóc, như cây vĩ cầm Zigan...", author: "Sergei Yesenin",
                poemLeft: [
                    "Bão tuyết khóc như cây vĩ cầm Di-gan.",
                    "Cô gái đáng yêu, nụ cười hiếm ác,",
                    "Tôi không ngại sao trước ánh mắt màu lam?",
                    "Nhiều thứ tôi cần, cũng không cần nhiều thứ khác.",
                    "",
                    "Mình quá xa nhau và cũng quá khác nhau -",
                    "Em trẻ trung, mà tôi thì dày dạn."
                ],
                poemRight: [
                    "Hạnh phúc cho các chàng trai - còn ký ức phần tôi",
                    "Đêm tuyết xa xưa đã chìm vào dĩ vãng.",
                    "",
                    "Tôi chẳng được vuốt ve - vĩ cầm là giông tố đời tôi.",
                    "Nụ cười em khiến tim tôi nổi bão."
                ]
            },
            { id: 'gift', src: '/assets/gift.png', type: 'draggable', x: '31%', y: '28%', width: '12%', rotation: -12 },
            { id: 'vinyl', src: '/assets/vinyl.png', type: 'draggable', x: '19%', y: '65%', width: '12%', rotation: 15 },
            { id: 'heart_sticker', src: '/assets/heart_sticker.png', type: 'draggable', x: '61%', y: '8%', width: '14%', rotation: 0 },
            { id: 'xoxo', src: '/assets/xoxo.png', type: 'draggable', x: '74%', y: '65%', width: '12%', rotation: -5 },
        ]
    },
    {
        id: 2,
        elements: [
            { id: 'match', src: '/assets/match_ornament.png', type: 'draggable', x: '15%', y: '12%', width: '32%', rotation: -2 },
            { id: 'bow', src: '/assets/bow_sticker.png', type: 'draggable', x: '16%', y: '22%', width: '10%', rotation: 0 },
            {
                id: 'photo7', src: '/assets/locket.png', type: 'photo_poem', x: '14%', y: '23%', width: '35%', rotation: -5,
                title: "Một Người Tình Chung Thuỷ", author: "Robert Pack",
                poemLeft: [
                    "anh ngần ngại viết về mùa xuân",
                    "có một nỗi e sợ trước bao vẻ yêu kiều ấy",
                    "sự tiêu điều anh thấy nơi mọi vật",
                    "dù không một mình anh vẫn nghĩ đến sự đơn độc",
                    "",
                    "của Thượng Đế mới bị cô lập ở trên trời",
                    "của sự thông tuệ trở thành nỗi tuyệt vọng, không phải",
                    "niềm hạnh phúc"
                ],
                poemRight: [
                    "khi chúng ta ở bên nhau anh và em",
                    "những lời hứa về chân phúc ở tương lai đã bị bỏ rơi",
                    "",
                    "nhưng hãy yêu anh với sự thật lúc này trong mắt em",
                    "hãy xem chiếc lá rơi sớm là một nụ hôn",
                    "hãy xem sự thuỷ chung là điều thuộc về quá khứ",
                    "",
                    "Ô, đừng tin cậy bất cứ điều gì nơi anh cả",
                    "dù anh yêu em, như anh yêu mùa xuân vậy"
                ]
            },
            {
                id: 'photo8', src: '/assets/camera.png', type: 'photo_poem', x: '15%', y: '65%', width: '22%', rotation: 0,
                title: "Đêm", author: "Alejandra Pizarnik",
                poemLeft: [
                    "Tôi biết rất ít về đêm",
                    "Nhưng đêm dường như biết tôi,",
                    "Thậm chí giúp tôi như thể nó yêu tôi",
                    "Nó bao phủ tâm trí tôi bằng những vì sao của nó",
                    "Có lẽ đêm là sự sống và mặt trời là sự chết.",
                    "Có lẽ đêm là không-gì-cả",
                    "Và những giả định về nó là không-gì-cả",
                    "Có lẽ chỉ từ ngữ là thứ duy nhất tồn tại",
                    "Trong sự trống rỗng khổng lồ của nhiều thế kỷ"
                ],
                poemRight: [
                    "cào xé linh hồn chúng ta bằng ký ức của nó",
                    "Nhưng đêm phải biết những nỗi khổ đau của chúng ta",
                    "được nuôi dưỡng bằng máu và những ý tưởng của chúng ta",
                    "Nó phải ném sự hận thù vào ánh nhìn của chúng ta",
                    "biết chúng chứa đầy những tính toán và những bất đồng",
                    "Nhưng rồi tôi nghe đêm khóc trong xương tuỷ tôi",
                    "Giọt nước mắt khổng lồ của nó như mề sáng",
                    "Và thét lên về điều gì đó đã đi xa mãi mãi",
                    "Một ngày nào đó chúng ta sẽ lại hiện hữu."
                ]
            },
            { id: 'cat', src: '/assets/cat_sticker.png', type: 'draggable', x: '40%', y: '64%', width: '8%', rotation: 10 },
            {
                id: 'photo9', src: '/assets/film_strip.png', type: 'photo_poem', x: '54%', y: '12%', width: '30%', rotation: 5,
                title: "Tháng mười hai", author: "Michael Miller",
                poemLeft: [
                    "Em muốn được làm hành khách",
                    "trong xe anh lần nữa",
                    "và khép mắt lại",
                    "khi anh cầm lái,",
                    "",
                    "tỉnh táo và vững vàng",
                    "trong thế giới riêng của mình,",
                    "nhìn rõ mọi lằn ranh",
                    "trên con đường phía trước."
                ],
                poemRight: [
                    "đọc theo một quãng dài",
                    "đường cao tốc trống trải",
                    "không có khuôn mặt nào",
                    "trong tầm mắt",
                    "",
                    "Em muốn được làm hành khách",
                    "trong xe anh lần nữa",
                    "và trao lại cuộc đời của em",
                    "cho anh"
                ]
            },
            { id: 'lighter', src: '/assets/lighter_ornament.png', type: 'draggable', x: '75%', y: '76%', width: '16%', rotation: 12 },
        ]
    }
];

const PoemScrapbook = ({ onBack, onNext }) => {
    const [currentSpread, setCurrentSpread] = useState(0);
    const [flippedIds, setFlippedIds] = useState(new Set());
    const [selectedPoem, setSelectedPoem] = useState(null);
    const constraintsRef = useRef(null);

    const toggleFlip = (id) => {
        setFlippedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) newSet.delete(id);
            else newSet.add(id);
            return newSet;
        });
    };

    const handleNext = () => {
        if (currentSpread < spreads.length - 1) {
            setCurrentSpread(currentSpread + 1);
            setFlippedIds(new Set()); // Reset flips on page turn
        } else {
            onNext();
        }
    };

    const handleBack = () => {
        if (currentSpread > 0) {
            setCurrentSpread(currentSpread - 1);
            setFlippedIds(new Set()); // Reset flips on page turn
        } else {
            onBack();
        }
    };

    return (
        <div className="relative w-full h-screen flex items-center justify-center font-['Cormorant_Infant']">
            <div className="absolute inset-0 bg-[#260201] -z-10" />

            {/* Main Book Container */}
            <div className="relative w-[100vw] max-w-[1534px] aspect-[1136/700] z-10 flex items-center justify-center p-8">
                {/* Book Base */}
                <img src="/assets/book_base.png" className="w-full h-full object-contain drop-shadow-2xl" alt="" />

                {/* Spread Content */}
                <div ref={constraintsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSpread}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="relative w-full h-full pointer-events-auto"
                        >
                            {spreads[currentSpread].elements.map((el) => {
                                if (el.type === 'static') {
                                    return (
                                        <img
                                            key={el.id}
                                            src={el.src}
                                            alt=""
                                            className="absolute pointer-events-none select-none"
                                            style={{
                                                left: el.x,
                                                top: el.y,
                                                width: el.width,
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                        />
                                    );
                                }

                                if (el.type === 'photo_poem') {
                                    return (
                                        <motion.div
                                            key={el.id}
                                            drag
                                            dragConstraints={constraintsRef}
                                            className="absolute cursor-pointer"
                                            onClick={() => setSelectedPoem(el)}
                                            style={{
                                                left: el.x,
                                                top: el.y,
                                                width: el.width,
                                                rotate: el.rotation || 0,
                                                transform: 'translate(-50%, -50%)',
                                                zIndex: 30,
                                            }}
                                        >
                                            <img src={el.src} alt="" className="w-full h-auto drop-shadow-xl rounded-sm hover:scale-105 transition-transform" />
                                        </motion.div>
                                    );
                                }

                                if (el.type === 'poem') {
                                    const isFlipped = flippedIds.has(el.id);
                                    return (
                                        <motion.div
                                            key={el.id}
                                            drag
                                            dragConstraints={constraintsRef}
                                            className="absolute cursor-pointer"
                                            style={{
                                                left: el.x,
                                                top: el.y,
                                                width: el.width,
                                                zIndex: isFlipped ? 50 : 20,
                                                perspective: 1000,
                                            }}
                                        >
                                            <motion.div
                                                initial={false}
                                                animate={{ rotateY: isFlipped ? 180 : el.rotation || 0 }}
                                                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                                                onClick={() => toggleFlip(el.id)}
                                                style={{ transformStyle: 'preserve-3d' }}
                                            >
                                                {/* Front (Photo) */}
                                                <div style={{ backfaceVisibility: 'hidden' }}>
                                                    <img src={el.src} alt="" className="w-full h-auto drop-shadow-lg rounded-sm" />
                                                </div>
                                                {/* Back (Poem) */}
                                                <div
                                                    className="absolute inset-0 bg-[#f9f3e9] p-4 flex items-center justify-center text-center shadow-xl border border-[#d1bfab]"
                                                    style={{
                                                        backfaceVisibility: 'hidden',
                                                        transform: 'rotateY(180deg)',
                                                    }}
                                                >
                                                    <p className="text-[#B7292E] text-sm italic whitespace-pre-line leading-relaxed">
                                                        {el.poem}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    );
                                }

                                return (
                                    <motion.img
                                        key={el.id}
                                        src={el.src}
                                        drag
                                        dragConstraints={constraintsRef}
                                        className="absolute cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
                                        style={{
                                            left: el.x,
                                            top: el.y,
                                            width: el.width,
                                            rotate: el.rotation || 0,
                                            transform: 'translate(-50%, -50%)',
                                            zIndex: 30,
                                        }}
                                        alt=""
                                    />
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Global Navigation Arrows */}
                <button
                    onClick={handleBack}
                    className="absolute left-0 -translate-x-[calc(100%-clamp(32px,calc((100vw-100%)/2-8px),120px))] top-1/2 -translate-y-1/2 p-4 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                    style={{ zIndex: 100, opacity: 1, filter: 'none' }}
                >
                    <img src="/assets/arrow_left.png" className="w-[min(80px,9vw)] h-auto" style={{ filter: 'none', opacity: 1 }} alt="Back" />
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-0 translate-x-[calc(100%-clamp(32px,calc((100vw-100%)/2-8px),120px))] top-1/2 -translate-y-1/2 p-4 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                    style={{ zIndex: 100, opacity: 1, filter: 'none' }}
                >
                    <img src="/assets/arrow_right.png" className="w-[min(80px,9vw)] h-auto" style={{ filter: 'none', opacity: 1 }} alt="Next" />
                </button>
            </div>

            {/* Full Screen Poem Modal */}
            <AnimatePresence>
                {selectedPoem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-8 overflow-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-6xl aspect-[4/3] bg-[#f9f3e9] shadow-2xl rounded-sm p-12 md:p-20 overflow-auto flex flex-col items-center"
                            style={{ backgroundImage: 'url("/assets/paper_texture.png")', backgroundSize: 'cover' }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedPoem(null)}
                                className="absolute top-8 right-8 text-[#B7292E] hover:scale-110 transition-transform p-2"
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>

                            {/* Poem Header */}
                            <h1 className="text-[32px] text-[#B7292E] mb-2 font-serif">{selectedPoem.title}</h1>
                            <p className="text-xl md:text-2xl text-[#B7292E]/80 mb-12 italic font-serif leading-relaxed">{selectedPoem.author}</p>

                            {/* Poem Content (Two Columns) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[3em] gap-y-4 w-fit mx-auto text-[#B7292E] font-serif text-[18px] leading-[1.4]">
                                <div className="space-y-1">
                                    {selectedPoem.poemLeft.map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>
                                <div className="space-y-1">
                                    {selectedPoem.poemRight.map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PoemScrapbook;
