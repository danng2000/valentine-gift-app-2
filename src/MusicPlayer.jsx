import React, { useState, useEffect, useCallback, useRef } from 'react';
import YouTube from 'react-youtube';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Shuffle, Repeat, ListMusic } from 'lucide-react';

const PLAYLIST_ID = 'PLnNm_Ady_0LF_KOSAKU6MqHmZma5PBWJD';
const SEED_VIDEO_ID = 'vEEpj8fTKwY'; // First video in the playlist

const MusicPlayer = ({ autoPlay = false }) => {
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [trackTitle, setTrackTitle] = useState('Silent Night...');
    const [trackAuthor, setTrackAuthor] = useState('Loading playlist...');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [isMuted, setIsMuted] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const progressRef = useRef(null);
    const infoIntervalRef = useRef(null);

    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            autoplay: autoPlay ? 1 : 0,
            controls: 0,
            listType: 'playlist',
            list: PLAYLIST_ID,
            loop: 1,
            modestbranding: 1,
            rel: 0,
            origin: window.location.origin,
        },
    };

    const updateTrackInfo = useCallback((p) => {
        if (!p) return;
        try {
            const data = p.getVideoData();
            if (data && data.title && data.title !== 'Loading...') {
                setTrackTitle(data.title);
                setTrackAuthor(data.author || 'YouTube Artist');
            }

            const dur = p.getDuration();
            if (dur > 0) setDuration(dur);

            // Fetch thumbnail from current video URL
            const url = p.getVideoUrl();
            if (url) {
                const match = url.match(/[?&]v=([^&]+)/);
                if (match) {
                    setThumbnailUrl(`https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`);
                }
            }
        } catch (e) {
            // Player not fully initialized yet
        }
    }, []);

    const onReady = useCallback((event) => {
        const p = event.target;
        setPlayer(p);

        if (isShuffle) p.setShuffle(true);

        if (autoPlay) {
            setIsPlaying(true);
            // Proactively load and play
            p.loadPlaylist({
                list: PLAYLIST_ID,
                listType: 'playlist',
                index: 0,
                startSeconds: 0
            });
            p.playVideo();

            // Start polling for metadata (YouTube API can be slow to return metadata)
            if (infoIntervalRef.current) clearInterval(infoIntervalRef.current);
            infoIntervalRef.current = setInterval(() => {
                updateTrackInfo(p);
            }, 1000);
        }
    }, [autoPlay, isShuffle, updateTrackInfo]);

    const onError = useCallback((event) => {
        console.error("YouTube Player Error:", event.data);
    }, []);

    const onStateChange = useCallback((event) => {
        const state = event.data;
        // YT states: -1 unstarted, 0 ended, 1 playing, 2 paused, 3 buffering, 5 cued
        if (state === 1) {
            setIsPlaying(true);
            updateTrackInfo(event.target);
        } else {
            setIsPlaying(false);
        }
    }, [updateTrackInfo]);

    const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

    // Real playlist data synced from YouTube
    const playlistData = [
        { videoId: "vEEpj8fTKwY", title: "爱Ni但说不出Kou (I Like You)", author: "Karencici", duration: "3:22" },
        { videoId: "s8mAqYqibcc", title: "直到我until I", author: "青井", duration: "4:37" },
        { videoId: "RkIt7BTHc2w", title: "Please", author: "Haezee 黄玮昕", duration: "3:09" },
        { videoId: "L6aXnx3K0s0", title: "Sometimes", author: "KnowKnow", duration: "4:09" },
        { videoId: "UbqqkHbM99I", title: "R&B All Night", author: "KnowKnow", duration: "4:29" },
        { videoId: "31tpqyCJ0lI", title: "Lover Boy 88", author: "Phum Viphurit & Higher Brothers", duration: "4:35" },
        { videoId: "Ew9_ZgOArOg", title: "看起来不错其实也还好", author: "J.Sheon", duration: "4:03" },
        { videoId: "1n_i0JupwRA", title: "怪天气 Strange Weather", author: "YELLOW黄宣 & 9m88", duration: "4:34" },
        { videoId: "I36thdeO9wk", title: "TVB", author: "布鲁昔", duration: "4:02" },
        { videoId: "Wrxomaav4HQ", title: "无法抗拒的你", author: "Maderlin Weng", duration: "8:00" },
        { videoId: "3OHT350Acj4", title: "醉后喜欢我", author: "icyball 冰球乐团", duration: "4:21" },
        { videoId: "2G_Pnakzdc0", title: "Twenty-Two", author: "David Tao", duration: "4:22" },
        { videoId: "egRUmSCkg5c", title: "7-11 的爱恋", author: "梦飞船", duration: "4:43" },
        { videoId: "aT_wAEeR4vg", title: "能不能和我留在台北", author: "icyball 冰球乐团", duration: "4:04" },
        { videoId: "XhUXUYEwYf0", title: "漫步香港1999", author: "布鲁昔", duration: "3:42" },
        { videoId: "_zvMspsjNgA", title: "在2103公里之间", author: "icyball 冰球乐团", duration: "3:54" },
        { videoId: "812omgU1tHs", title: "爱爱爱", author: "Khalil Fong 方大同", duration: "3:43" },
        { videoId: "nPcByqGfxQo", title: "100种生活", author: "卢广仲 Crowd Lu", duration: "5:02" },
        { videoId: "pShgo1C4mAo", title: "像是做了一场梦", author: "Karencici", duration: "3:42" },
        { videoId: "UIwMhLExAZc", title: "再一起", author: "余佳韵", duration: "4:07" },
        { videoId: "27pAkYbVOGE", title: "不只是场梦", author: "Nicky Lee 李玖哲", duration: "3:40" },
        { videoId: "xoXJU0ojEoY", title: "雨天", author: "张石荻Steven", duration: "4:24" },
        { videoId: "IiFm7AWP9n4", title: "月亮代表我的心", author: "邓丽君 Teresa Teng", duration: "3:25" },
        { videoId: "Q976RMQep8A", title: "千言万语", author: "邓丽君 Teresa Teng", duration: "3:29" },
        { videoId: "Hym5TVIovHw", title: "亲密爱人", author: "梅艳芳 Anita Mui", duration: "4:59" },
        { videoId: "ao6cgd7ZQ4c", title: "情人的眼泪", author: "蔡琴 Tsai Chin", duration: "6:28" },
        { videoId: "n-jHlCu0k2I", title: "小城故事", author: "邓丽君 Teresa Teng", duration: "2:37" },
        { videoId: "n3B5XpRvyhI", title: "千千阕歌", author: "陈慧娴", duration: "5:04" },
        { videoId: "WSj5kJDzNPM", title: "红豆", author: "王菲 Faye Wong", duration: "4:16" },
        { videoId: "Z8Mqw0b9ADs", title: "青花瓷", author: "Jay Chou 周杰伦", duration: "4:04" },
        { videoId: "zPoId89NOM4", title: "我是一只鱼", author: "落日飞车 Sunset Rollercoaster", duration: "4:25" },
        { videoId: "ltFNlTWDgU8", title: "我想和你一起", author: "Wendy Wander 温蒂漫步", duration: "7:03" },
        { videoId: "ZsiN2YVrdmA", title: "还是会寂寞", author: "Cheer Chen 陈绮贞", duration: "4:45" },
        { videoId: "9Gb9VoQ8Po8", title: "不值得", author: "梦飞船 Dreamz FM", duration: "4:48" }
    ];

    const togglePlay = () => {
        if (!player) return;
        if (isPlaying) {
            player.pauseVideo();
        } else {
            player.playVideo();
            if (!infoIntervalRef.current) {
                infoIntervalRef.current = setInterval(() => updateTrackInfo(player), 1000);
            }
        }
    };

    const playAtIndex = (index) => {
        if (player) {
            player.playVideoAt(index);
            setIsPlaylistOpen(false);
        }
    };

    const prevTrack = () => player?.previousVideo();
    const nextTrack = () => player?.nextVideo();

    const toggleMute = () => {
        if (!player) return;
        isMuted ? player.unMute() : player.mute();
        setIsMuted(!isMuted);
    };

    const toggleShuffle = () => {
        if (player) {
            player.setShuffle(!isShuffle);
        }
        setIsShuffle(!isShuffle);
    };

    const toggleRepeat = () => setIsRepeat(!isRepeat);
    const togglePlaylist = () => setIsPlaylistOpen(!isPlaylistOpen);

    const handleProgressClick = (e) => {
        if (!player || !duration || !progressRef.current) return;
        const rect = progressRef.current.getBoundingClientRect();
        const percentage = (e.clientX - rect.left) / rect.width;
        const seekTime = percentage * duration;
        player.seekTo(seekTime, true);
        setCurrentTime(seekTime);
    };

    useEffect(() => {
        const timeInterval = setInterval(() => {
            if (player && isPlaying) {
                try {
                    setCurrentTime(player.getCurrentTime() || 0);
                } catch (e) { }
            }
        }, 500);

        return () => {
            clearInterval(timeInterval);
            if (infoIntervalRef.current) clearInterval(infoIntervalRef.current);
        };
    }, [player, isPlaying]);

    const formatTime = (time) => {
        if (!time || isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[60]">
            {/* Hidden YouTube Player */}
            <div style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0, overflow: 'hidden' }}>
                <YouTube
                    videoId={SEED_VIDEO_ID}
                    opts={opts}
                    onReady={onReady}
                    onStateChange={onStateChange}
                    onError={onError}
                />
            </div>

            {/* Playlist Panel Overlay */}
            {isPlaylistOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[59]"
                    onClick={() => setIsPlaylistOpen(false)}
                />
            )}

            {/* Sliding Playlist Panel */}
            <div
                className={`fixed top-0 right-0 h-[calc(100%-60px)] w-full max-w-[360px] z-[61] transition-transform duration-500 ease-in-out transform ${isPlaylistOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                style={{
                    background: 'rgba(10, 0, 0, 0.95)',
                    backdropFilter: 'blur(15px)',
                    borderLeft: '1px solid rgba(198, 40, 40, 0.2)',
                    boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
                }}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-white/5">
                        <h3 className="text-[#e8c4a0] font-medium text-lg flex items-center gap-2">
                            <ListMusic size={20} className="text-[#C62828]" />
                            Playlist Queue
                        </h3>
                        <button onClick={togglePlaylist} className="text-[#e8c4a0]/40 hover:text-[#e8c4a0] transition">
                            ✕
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                        {playlistData.map((item, index) => {
                            const isActive = trackTitle.includes(item.title) || (index === 0 && trackTitle === 'Silent Night...');
                            return (
                                <button
                                    key={index}
                                    onClick={() => playAtIndex(index)}
                                    className={`w-full flex items-center gap-3 px-6 py-3 hover:bg-white/5 transition text-left group ${isActive ? 'bg-[#C62828]/10' : ''
                                        }`}
                                >
                                    <div className="w-12 h-12 rounded bg-white/5 flex-shrink-0 relative overflow-hidden flex items-center justify-center shadow-inner">
                                        <img
                                            src={`https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`}
                                            className="w-full h-full object-cover"
                                            alt=""
                                            loading="lazy"
                                        />
                                        {isActive && isPlaying && (
                                            <div className="absolute inset-0 bg-[#C62828]/40 flex items-center justify-center backdrop-blur-[1px]">
                                                <div className="flex gap-1 items-end h-3">
                                                    <div className="w-0.5 bg-white animate-[music-bar_0.6s_ease-in-out_infinite]" style={{ height: '60%' }} />
                                                    <div className="w-0.5 bg-white animate-[music-bar_0.8s_ease-in-out_infinite]" style={{ height: '100%' }} />
                                                    <div className="w-0.5 bg-white animate-[music-bar_0.7s_ease-in-out_infinite]" style={{ height: '80%' }} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm truncate font-medium ${isActive ? 'text-[#C62828]' : 'text-[#e8c4a0]'}`}>
                                            {item.title}
                                        </p>
                                        <p className="text-xs text-[#e8c4a0]/40 truncate">{item.author}</p>
                                    </div>
                                    <span className="text-[10px] text-[#e8c4a0]/20 tabular-nums">
                                        {item.duration}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Player UI */}
            <div
                style={{
                    background: 'linear-gradient(180deg, rgba(20, 2, 1, 0.92) 0%, rgba(10, 0, 0, 0.98) 100%)',
                    borderTop: '1px solid rgba(198, 40, 40, 0.15)',
                    backdropFilter: 'blur(20px)',
                }}
            >
                <div
                    ref={progressRef}
                    className="w-full h-1 cursor-pointer group relative"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                    onClick={handleProgressClick}
                >
                    <div
                        className="h-full transition-all duration-300"
                        style={{
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, #8B0000, #C62828, #e04040)',
                        }}
                    />
                </div>

                <div className="flex items-center gap-3 px-4 py-2.5">
                    <button onClick={prevTrack} className="p-1.5 cursor-pointer opacity-70 hover:opacity-100" style={{ color: '#e8c4a0' }}>
                        <SkipBack size={16} fill="currentColor" />
                    </button>

                    <button onClick={togglePlay} className="p-2 cursor-pointer hover:scale-110 transition" style={{ color: '#e8c4a0' }}>
                        {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
                    </button>

                    <button onClick={nextTrack} className="p-1.5 cursor-pointer opacity-70 hover:opacity-100" style={{ color: '#e8c4a0' }}>
                        <SkipForward size={16} fill="currentColor" />
                    </button>

                    <span className="text-xs tabular-nums text-[#e8c4a0]/40 min-w-[70px]">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </span>

                    <div className="flex items-center gap-3 flex-1 min-w-0 ml-2">
                        <div
                            className="w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#8B0000] to-[#C62828] flex items-center justify-center shadow-lg"
                        >
                            {thumbnailUrl ? (
                                <img src={thumbnailUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-sm">🎵</span>
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm truncate font-medium text-[#e8c4a0]">{trackTitle}</p>
                            <p className="text-xs truncate text-[#e8c4a0]/40">{trackAuthor}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={toggleMute} className="p-1.5 cursor-pointer text-[#e8c4a0]/50 hover:text-[#e8c4a0]">
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                        <button onClick={toggleShuffle} className="p-1.5 cursor-pointer" style={{ color: isShuffle ? '#C62828' : '#e8c4a0', opacity: isShuffle ? 1 : 0.3 }}>
                            <Shuffle size={16} />
                        </button>
                        <button onClick={toggleRepeat} className="p-1.5 cursor-pointer" style={{ color: isRepeat ? '#C62828' : '#e8c4a0', opacity: isRepeat ? 1 : 0.3 }}>
                            <Repeat size={16} />
                        </button>
                        <button onClick={togglePlaylist} className="p-1.5 cursor-pointer hover:scale-110 transition" style={{ color: isPlaylistOpen ? '#C62828' : '#e8c4a0' }}>
                            <ListMusic size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(198, 40, 40, 0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(198, 40, 40, 0.5);
                }
                @keyframes music-bar {
                    0%, 100% { height: 30%; }
                    50% { height: 100%; }
                }
            `}</style>
        </div>
    );
};

export default MusicPlayer;
